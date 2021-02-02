import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import isEmpty from "lodash/isEmpty";
import BigNumber from "bignumber.js";
import RefreshIcon from "@material-ui/icons/Refresh";

import SNETButton from "shared/dist/components/SNETButton";
import { useStyles } from "./styles";
import { ControlServiceRequest } from "../../Utils/Daemon/ControlService";
import { checkIfKnownError } from "shared/dist/utils/error";
import { aiServiceListActions, loaderActions } from "../../Services/Redux/actionCreators";
import UnclaimedPayments from "./UnclaimedPayments";
import MPEContract from "../../Utils/PlatformContracts/MPEContract";
import { blockChainEvents } from "../../Utils/Blockchain";
import { blocksToDays, signatureHexToVRS, toBNString } from "../../Utils/Grpc";
import { initSDK } from "shared/dist/utils/snetSdk";
import { itemsPerPageOptions } from "./content";
import MmAuthorization from "./MMAuthorization";
import AccountDetails from "./AccountDetails";
import ClaimsAggregate from "./ClaimsAggregate";
import { alertTypes } from "shared/dist/components/AlertBox";
import { LoaderContent } from "../../Utils/Loader";
import AlertBox from "shared/dist/components/AlertBox";
import { MetamaskError } from "shared/dist/utils/error";
import ClaimsSuccessPopup from "./ClaimsSuccessPopup";
import { cogsToAgi } from "shared/dist/utils/Pricing";
import ConnectMetamask from "./ConnectMetamask";

let controlServiceRequest;
const defaultPaymentAggregate = {
  count: 0,
  amount: new BigNumber(0),
  expiry: { d7: { count: 0, amount: new BigNumber(0) } },
};

const defaultPagination = {
  limit: 0,
  offset: 0,
  totalCount: 0,
  itemsPerPage: itemsPerPageOptions[0].value,
};

class WalletAccount extends React.Component {
  state = {
    mmAuthorized: false,
    unclaimedPayments: [],
    pendingPayments: [],
    mmAccDetails: { escrowBalance: "", tokenBalance: "" },
    aggregatePaymentDetails: defaultPaymentAggregate,
    pagination: defaultPagination,
    selectedChannels: {},
    getPaymentsListAlert: {},
    claimChannelsAlert: {},
    showClaimsSuccessPopup: false,
    transactionDetails: {
      latest: { channelsClaimed: [], amountClaimed: "" },
      session: { channelsClaimed: [], amountClaimed: "" },
    },
    mmConnected: false,
  };

  async componentDidMount() {
    const { orgUuid, getServices } = this.props;
    await this.initControlServiceRequest();
    this.initEscrow();
    const serviceList = await getServices(orgUuid);
    this.findServiceHost(serviceList);
  }

  async componentDidUpdate(prevProps) {
    const { orgUuid, getServices } = this.props;
    if (prevProps.orgUuid !== orgUuid) {
      const serviceList = await getServices(orgUuid);
      this.findServiceHost(serviceList);
    }
  }

  initControlServiceRequest = async () => {
    try {
      controlServiceRequest = new ControlServiceRequest();
      await controlServiceRequest._initWeb3();
    } catch (e) {
      if (e.message === "Metamask not available") {
        return this.setState({ mmConnected: false });
      }
    }
  };

  initEscrow = async () => {
    const sdk = await initSDK();
    if (!sdk) {
      return;
    }
    const escrowBalance = await sdk.account.escrowBalance();
    const tokenBalance = await sdk.account.balance();
    this.setState({
      mmAccDetails: { tokenBalance: toBNString(tokenBalance), escrowBalance: escrowBalance.toString() },
      mmConnected: true,
    });
  };

  findServiceHost = serviceList => {
    const endpoints = serviceList
      .map(el => {
        if (isEmpty(el.groups)) {
          return undefined;
        }
        return el.groups[0].endpoints;
      })
      .filter(el => Boolean(el));

    const validEndpoints = endpoints.reduce((acc, cur) => {
      Object.entries(cur).forEach(([endpoint, value]) => {
        if (value.valid && !acc.includes(endpoint)) {
          acc.push(endpoint);
        }
      });
      return acc;
    }, []);

    const serviceHost = validEndpoints[0];
    if (!serviceHost) {
      return this.setState({
        getPaymentsListAlert: {
          type: alertTypes.ERROR,
          children: (
            <span>
              Please make sure atleast one daemon endpoint is up and has been validated after your service is published
              on blockchain, you can do this by clicking on the
              <strong>Validate Daemon</strong> button on the service landing page.
            </span>
          ),
        },
      });
    }
    controlServiceRequest.serviceHost = serviceHost;
  };

  getUnclaimedPaymentsFromDaemon = async () => {
    const unclaimedPayments = await controlServiceRequest.getListUnclaimed();
    return unclaimedPayments;
  };

  getPendingPaymentsFromDaemon = async () => {
    const pendingPayments = await controlServiceRequest.getListInProgress();
    return pendingPayments;
  };

  claimMPEChannels = async payments => {
    try {
      // payload order:- channelId, actualAmount, plannedAmount, isSendback, v, r, s
      const defaultPayloadAccumulator = [[], [], [], [], [], [], []];
      const payloadForMultiChannelClaim = payments.reduce((acc, cur) => {
        const { channelId, signedAmount, signature } = cur;
        const { v, r, s } = signatureHexToVRS(signature);
        acc[0].push(channelId);
        acc[1].push(signedAmount);
        acc[2].push(signedAmount);
        acc[3].push(false);
        acc[4].push(v);
        acc[5].push(r);
        acc[6].push(s);
        return acc;
      }, defaultPayloadAccumulator);
      const mpe = new MPEContract();
      this.props.startAppLoader(LoaderContent.SIGN_CLAIMS_IN_MM);
      await mpe._initBlockChain();
      const address = await mpe._getAddress();
      const method = mpe.multiChannelClaim(...payloadForMultiChannelClaim)(address);
      method.on(blockChainEvents.TRANSACTION_HASH, () => {
        // TODO call daemon start claims
        this.props.startAppLoader(LoaderContent.CLAIMING_CHANNELS_IN_BLOCKCHAIN);
      });
      method.once(blockChainEvents.CONFIRMATION, async () => {
        const { unclaimedPayments, pendingPayments, selectedChannels } = this.state;
        await this.initEscrow();

        const currentTransaction = payments.reduce(
          (acc, cur) => ({
            channelsClaimed: [...acc.channelsClaimed, cur.channelId],
            amountClaimed: BigNumber.sum(acc.amountClaimed, cur.signedAmount),
          }),
          { channelsClaimed: [], amountClaimed: 0 }
        );

        const updatedUnclaimedPayments = unclaimedPayments.filter(
          el => !currentTransaction.channelsClaimed.includes(el.channelId)
        );

        const updatedPendingPayments = pendingPayments.filter(
          el => !currentTransaction.channelsClaimed.includes(el.channelId)
        );

        const updatedSelectedChannels = { ...selectedChannels };
        currentTransaction.channelsClaimed.forEach(channel => {
          delete updatedSelectedChannels[channel];
        });

        this.setState(prevState => ({
          unclaimedPayments: updatedUnclaimedPayments,
          pendingPayments: updatedPendingPayments,
          selectedChannels: updatedSelectedChannels,
          claimChannelsAlert: {
            type: alertTypes.SUCCESS,
            message: `channels ${currentTransaction.channelsClaimed.join(
              ","
            )} have been claimed from the blockchain successfully. 
          Please refresh the list, to fetch the latest payments`,
          },
          showClaimsSuccessPopup: true,
          transactionDetails: {
            latest: {
              channelsClaimed: currentTransaction.channelsClaimed,
              amountClaimed: currentTransaction.amountClaimed,
            },
            session: {
              channelsClaimed: [
                ...prevState.transactionDetails.session.channelsClaimed,
                ...currentTransaction.channelsClaimed,
              ],
              amountClaimed: BigNumber.sum(
                prevState.transactionDetails.session.amountClaimed,
                currentTransaction.channelsClaimed
              ),
            },
          },
        }));
        await this.props.stopAppLoader();
        await method.off();
      });
      method.on(blockChainEvents.ERROR, e => {
        this.props.stopAppLoader();
        throw new MetamaskError(e);
      });
    } catch (e) {
      this.props.stopAppLoader();
      if (checkIfKnownError(e)) {
        return this.setState({ claimChannelsAlert: { type: alertTypes.ERROR, message: e.message } });
      }
      this.setState({
        claimChannelsAlert: { type: alertTypes.ERROR, message: "Unable to execute the claims. Please try later" },
      });
    }
  };

  claimChannelInBlockchain = async () => {
    try {
      this.props.startAppLoader(LoaderContent.START_CHANNEL_CLAIMS);
      this.setState({ claimChannelsAlert: {} });
      const { selectedChannels } = this.state;
      let pendingPayments = [],
        unclaimedPayments = [];

      Object.entries(selectedChannels).forEach(([channelId, checked]) => {
        if (checked) {
          const pendingPaymentSelected = this.state.pendingPayments.find(el => el.channelId === channelId);
          const unclaimedPaymentSelected = this.state.unclaimedPayments.find(el => el.channelId === channelId);
          if (pendingPaymentSelected) {
            pendingPayments.push(pendingPaymentSelected);
          } else if (unclaimedPaymentSelected) {
            unclaimedPayments.push(unclaimedPaymentSelected);
          }
        }
      });
      const paymentsToBeClaimedInBlockchain = [...pendingPayments];
      if (!isEmpty(unclaimedPayments)) {
        const channelIdList = unclaimedPayments.map(el => el.channelId);
        const startedPayments = await controlServiceRequest.startClaimForMultipleChannels(channelIdList);
        paymentsToBeClaimedInBlockchain.push(...startedPayments);
      }
      await this.claimMPEChannels(paymentsToBeClaimedInBlockchain);
    } catch (e) {
      this.props.stopAppLoader();
      if (checkIfKnownError(e)) {
        return this.setState({ claimChannelsAlert: { type: alertTypes.ERROR, message: e.message } });
      }
      this.setState({
        claimChannelsAlert: { type: alertTypes.ERROR, message: "Unable to execute the claims. Please try later" },
      });
    }
  };

  calculatePaymentAggregate = payments => {
    return payments.reduce((acc, cur) => {
      const updatedValue = {
        ...acc,
        count: acc.count + 1,
        amount: BigNumber.sum(acc.amount, cur.signedAmount).toFixed(),
      };
      const blocksRemaining = cur.channelExpiry - cur.currentBlock;
      if (blocksRemaining > 0 && blocksToDays(blocksRemaining) <= 7) {
        updatedValue.expiry = {
          ...acc.expiry,
          d7: {
            count: acc.expiry.d7.count + 1,
            amount: BigNumber.sum(acc.expiry.d7.amount, cur.signedAmount),
          },
        };
      }
      return updatedValue;
    }, defaultPaymentAggregate);
  };

  handleAuthorizeMM = async () => {
    try {
      this.setState({ getPaymentsListAlert: {} });
      this.props.startAppLoader(LoaderContent.GET_CLAIMS_LIST);
      const [unclaimedPayments, pendingPayments] = await Promise.all([
        this.getUnclaimedPaymentsFromDaemon(),
        this.getPendingPaymentsFromDaemon(),
      ]);
      const aggregatePaymentDetails = this.calculatePaymentAggregate([...unclaimedPayments, ...pendingPayments]);
      const totalCount = unclaimedPayments.length + pendingPayments.length;
      this.setState({
        mmAuthorized: true,
        unclaimedPayments,
        pendingPayments,
        aggregatePaymentDetails,
        pagination: { ...defaultPagination, totalCount, limit: totalCount < 10 ? totalCount : 10 },
      });
      this.props.stopAppLoader();
    } catch (e) {
      this.props.stopAppLoader();
      if (checkIfKnownError(e)) {
        this.setState({ getPaymentsListAlert: { type: alertTypes.ERROR, message: e.message, children: e.children } });

        // TODO set alert error
      }
      return undefined;
    }
  };

  onItemsPerPageChange = itemsPerPage => {
    this.setState(prevState => ({
      pagination: { ...prevState.pagination, itemsPerPage },
    }));
  };

  handlePageChange = offset => {
    this.setState(prevState => ({
      pagination: { ...prevState.pagination, offset },
    }));
  };

  handleSelectChannel = event => {
    const { value: channelId, checked } = event.target;
    this.setState(prevState => ({ selectedChannels: { ...prevState.selectedChannels, [channelId]: checked } }));
  };

  handleSuccessPopupClose = () => {
    this.setState(prevState => ({
      showClaimsSuccessPopup: false,
      transactionDetails: {
        ...prevState.transactionDetails,
        latest: { channelsClaimed: [], amountClaimed: "" },
      },
    }));
  };

  shouldClaimBeEnabled = () => Object.values(this.state.selectedChannels).some(Boolean);

  selectedChannelCount = () => Object.values(this.state.selectedChannels).filter(Boolean).length;

  render() {
    const { classes } = this.props;
    const {
      unclaimedPayments,
      pendingPayments,
      mmAccDetails,
      aggregatePaymentDetails,
      pagination,
      selectedChannels,
      mmAuthorized,
      getPaymentsListAlert,
      claimChannelsAlert,
      showClaimsSuccessPopup,
      transactionDetails,
      mmConnected,
    } = this.state;
    const paymentsList = [...unclaimedPayments, ...pendingPayments];

    if (!mmConnected) {
      return (
        <ConnectMetamask
          initControlServiceRequest={this.initControlServiceRequest}
          initEscrow={this.initEscrow}
          setMMConnected={() => this.setState({ mmConnected: true })}
        />
      );
    }

    if (!mmAuthorized) {
      return <MmAuthorization handleAuthorizeMM={this.handleAuthorizeMM} alert={getPaymentsListAlert} />;
    }

    return (
      <Grid container className={classes.walletAccContainer}>
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.topSection}>
          <Typography variant="h3">Wallet Account</Typography>
          <Typography variant="h5">
            Manage your token claims. Tokens can be claimed together or individually from each channel.
          </Typography>
        </Grid>
        <AccountDetails aggregatePaymentDetails={aggregatePaymentDetails} mmAccDetails={mmAccDetails} />
        <Grid item xs={12} sm={12} md={12} lg={12} className={classes.box}>
          <div className={classes.header}>
            <Typography variant="h6">Claims</Typography>
            <SNETButton children="refresh" color="primary" endIcon={<RefreshIcon />} onClick={this.handleAuthorizeMM} />
          </div>
          <div className={classes.walletAccWrapper}>
            <Typography className={classes.claimsDesc}>
              Below are the current revenue claims you collected from your AI services. Claims that are going to be
              expired soon are marked with “!” icon. Please note that you cannot select more than five claims at a time.
            </Typography>
            <ClaimsAggregate aggregatePaymentDetails={aggregatePaymentDetails} />
            {claimChannelsAlert.message ? (
              <div className={classes.alertBoxContainer}>
                <AlertBox type={claimChannelsAlert.type} message={claimChannelsAlert.message} />
              </div>
            ) : null}
            <ClaimsSuccessPopup
              show={showClaimsSuccessPopup}
              agiClaimed={cogsToAgi(transactionDetails.latest.amountClaimed)}
              channelIdList={transactionDetails.latest.channelsClaimed}
              handleClose={this.handleSuccessPopupClose}
              escrowBalance={cogsToAgi(mmAccDetails.escrowBalance)}
            />
            <div className={classes.claimSelectedSection}>
              <SNETButton
                children="Collect Claims"
                color="primary"
                variant="contained"
                onClick={this.claimChannelInBlockchain}
                disabled={!this.shouldClaimBeEnabled()}
              />
              <Typography>Selected ({this.selectedChannelCount()})</Typography>
            </div>
            <div>
              <UnclaimedPayments
                payments={paymentsList}
                pagination={pagination}
                onItemsPerPageChange={this.onItemsPerPageChange}
                handlePageChange={this.handlePageChange}
                selectedChannels={selectedChannels}
                onSelectChannel={this.handleSelectChannel}
              />
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  orgUuid: state.organization.uuid,
  limit: state.aiServiceList.pagination.limit,
  offset: state.aiServiceList.pagination.offset,
  totalCount: state.aiServiceList.totalCount,
  serviceList: state.aiServiceList.data,
});

const mapDispatchToProps = dispatch => ({
  startAppLoader: content => dispatch(loaderActions.startAppLoader(content)),
  stopAppLoader: () => dispatch(loaderActions.stopAppLoader()),
  getServices: orgUuid => dispatch(aiServiceListActions.getAiServiceList(orgUuid)),
});
export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(WalletAccount));
