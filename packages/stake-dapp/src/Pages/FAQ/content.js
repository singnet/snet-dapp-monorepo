import DiscussionImage from "shared/dist/assets/images/Discussion.png";
import DocumentationImage from "shared/dist/assets/images/Documentation.png";
import TelegramImage from "shared/dist/assets/images/Telegram.png";

export const communityDetails = [
  {
    to: "https://community.singularitynet.io/",
    image: DiscussionImage,
    title: "Join the Discussion",
    description: "Get in touch with community experts and other users in the SingularityNET Staking Help forum.",
  },
  {
    to: "https://dev.singularitynet.io/products/staking/",
    image: DocumentationImage,
    title: "Full Staking Documentation",
    description:
      "Learn more about the stages of the staking process and what happens to your AGI tokens whilst they are staked.",
  },
  {
    to: "https://telegram.me/singularitynet",
    image: TelegramImage,
    title: "Telegram Community",
    description:
      "Did not find the answers you were looking for?  Reach out to us and we will response to your questions as soon as possible.",
  },
];

export const stakingFAQ = [
  {
    question: "How long is a Staking window to reflect the 180 days?",
    answer: `
    <ul>
      <li>Every 30 days a stake window opens for 7 days</li>
      <li>You can refer the dates at the portal</li>
      <li>You will see the details once you login to the portal</li>
      <li>You would see the timer telling you till when the next staking window will   open.</li>
    </ul>
    <img src=${process.env.REACT_APP_CDN_LINK}/openStaking.png alt="Staking Window" />
    <p> Once the window opens</p>
    <p>You will see the below screen</p>
    <h3>Open Staking</h3>
    <img src=${process.env.REACT_APP_CDN_LINK}/openStaking_01.png alt="Open Staking" />
    <p>Click on the Add Stake Amount button</p>
    <h3>Add Stake</h3>
    <img src=${process.env.REACT_APP_CDN_LINK}/addStakeAmt_01.png alt="Add Stake Amount" />
    <img src=${process.env.REACT_APP_CDN_LINK}/addStakeAmt.png alt="Add Stake Amount" />
    <h3>Submit Stake ( Initiate transactions on blockchain) </h3>
    <p>Once you hit the Submit Stake button, you will be connected to the metamask asking you to authorize the deposit </p>
    <img src=${process.env.REACT_APP_CDN_LINK}/metamaskNotification.png alt="Submitting Stake" />
    <h3>Transaction / Gas Fee</h3>
    <p>Click on the Edit option and you would see the below options, this is to help one with the speed of acceptance of transaction on blockchain,</p>
    <p>You would be presented with the options shown below</p>
    <img src=${process.env.REACT_APP_CDN_LINK}/customizeGas.png alt="Customizing Gas" />
    <h3>Blockchain transaction</h3>
    <p>Once the blockchain transaction is successfully completed, you will see a  confirmation message in green ( show below) saying </p>
    <img src=${process.env.REACT_APP_CDN_LINK}/successMsg.png alt="Sucess Message Notification" />
    `,
  },
  {
    question: "What happens if my transaction fails ?",
    answer: `
      <p>Please attempt again as your AGIs have not been Staked yet.</p>
      <p>You could see the Balance of Your account on the landing page itself </p>
      <p>You will see the same account balance and a successful message as below on your page.</p>
      <img src=${process.env.REACT_APP_CDN_LINK}/successMsg.png alt="Sucess Message Notification" />
      <p>Please note you have an option to opt-out of the next window. The default behaviour is for the stake amount plus the reward to automatically carry over into the next stake window.</p>
      <p>You can choose to not opt-in at the time of staking itself.</p>
      <p> In addition  a  window is opened towards the end of each staking period to opt-out if you want to change their original decision. This enables the user to not carry over their current stake amount and reward into the next stake window and gives them the option to withdraw when the current staking period completes</p>
    `,
  },
  {
    question: "What If I miss the window",
    answer: `
      <p>You can stake on the next window that will open up , but once the current window is closed , you cannot stake any more !</p>
    `,
  },
  {
    question: "How do I check on the returns from my Stake ?",
    answer: `
      <p>Go to the Tab “Ready To Claim”</p>
      <p>The Account balance and the Your Stake gives a summary on what has been Staked and the rewards you are eligible for.</p>
      <p>You will also see the total amount staked by you so far.</p>
      <img src=${process.env.REACT_APP_CDN_LINK}/staking.png alt="Staking Image" />
    `,
  },
  {
    question: "How do I know if my stake is approved ?",
    answer: `
      <p>After the submission & approval period, the accepted stakes will be available in the Incubation tab</p>
      <img src=${process.env.REACT_APP_CDN_LINK}/incubation.png alt="Incubation" />
      <p>You could also go to the Transaction history tab and would see a record with Process Status = “Approved”</p>
      <img src=${process.env.REACT_APP_CDN_LINK}/transactionHistory.png alt="Transaction History" />
      <img src=${process.env.REACT_APP_CDN_LINK}/incubation_01.png alt="Incubation" />
    `,
  },
  {
    question: "How long does it take for the stake to be approved?",
    answer: `
      <p>Stake Window Approval kicks off Immediately after the submission end date and is usually within 8 hrs after submission period ends.</p>
    `,
  },
  {
    question: "What if I DO NOT want to Auto renew my Stake ?",
    answer: `
      <p>You could perform the same at two places:</p>
      <ol>
        <li>During the initial stake<p>Unselect the option shown below when you stake.</p></li>
        <img src=${process.env.REACT_APP_CDN_LINK}/autoRenew.png alt="Stake Renew" />
        <li>During the Last week of the stake window completion (in the incubation tab)</li>
    `,
  },
  {
    question: "How do I know when I can withdraw my stake?",
    answer: `
      <p>On the incubating tab , you could see when would you be eligible to withdraw your stake.</p>
      <img src=${process.env.REACT_APP_CDN_LINK}/incubation.png alt="Incubation" />
      <p>Please note Withdraw/Claim can happen from Ready To Claim tab only. If the Auto Renewal is not opted after the stake window any time user can claim the Stake.</p>
    `,
  },
  {
    question: "How will the rewards be transferred or how do I know which stakes are ready to be claimed?",
    answer: `
      <p>Click on the Ready to Claim Tab and you will see the details of the ones which are ready.
      Please note that stake along with the reward will be transferred when the user claims.</p>
      <img src=${process.env.REACT_APP_CDN_LINK}/staking.png alt="Staking" />  
    `,
  },
  {
    question: "I have staked some tokens and now have changed my mind and want to withdraw. What should I do?",
    answer: `
      <p>Users can withdraw the stake on the amount deposited in the respective stake window before submission closes.</p>
      <p>If the submission period is closed then the user needs to wait for the stake window to complete and need to opt out of auto renewal.</p>
    `,
  },
];

export const generalFAQ = [
  {
    question: "What browser and wallet combination is supported?",
    answer: `<p>The staking DApp works only with Metamask. Our recommended combinations are</p> 
      <ol>
      <li>Chrome with latest stable version of Metamask.</li>
      <li>Firefox with latest stable version of Metamask.</li>
      </ol>`,
  },
  {
    question: "What type of wallets can I use to stake on the Staking DApp?",
    answer: `<p>The staking DApp works only with Metamask. Please set up your ethereum account on Metamask to stake.</p>`,
  },
];

export const metamaskFAQ = [
  {
    question: "How can I use my hardware wallet to stake on the Staking DApp?",
    answer: `<p><span>The staking DApp works only with Metamask. Please set up your hardware wallet on Metamask using this  </span><a href="https://metamask.zendesk.com/hc/en-us/articles/360020394612-How-to-connect-a-Trezor-or-Ledger-Hardware-Wallet" target="_new" rel="noopener noreferrer"><span>guide</span></a>.</p>`,
  },
  {
    question: "I am using Metamask but I am unable to connect on the portal",
    answer: `<p>Please check the version of your Metamask. The staking DApp works with the stable version of Metamask and not with beta versions.</p>`,
  },
  {
    question: "I connected my Ledger hardware wallet to Metamask but am still unable to connect or stake",
    answer: `<p>If you are using a hardware wallet from ledger connected to metamask, you need to have enabled contract data. Activate contract data in the settings of the app if you want to send ERC-20 tokens.</p>`,
  },
  {
    question: "When the Metamask window opens up it does not give me an option to confirm or submit the transaction",
    answer: `<ul>
    <li>At times Metamask windows does not pop-up and just shows a notification on the Metamask plugin icon on the browser tab. You have to open Metamask and confirm the transaction.</li>
    <li>Ensure that you have enough ETH in the account you are using.</li>
    </ul>`,
  },
  {
    question: "Metamask shows operation as pending for a long time. What should I do?",
    answer: `This occurs when the gas price provided for the transaction is very low
    <ul>
        <li>If a transaction is submitted with a low gas price, subsequent transactions will be stuck.</li>
        <li>If the original low cost transaction is submitted via metamask then you can resubmit by increasing gas price.</li>
        <li>Note that re-submitting the transaction multiple times will not fix this problem.</li>
    </ul>`,
  },
];

export const troubleShootingFAQ = [
  {
    question: "How does partial withdrawals work?",
    answer: `<p>In order to withdraw your stake (staked amount along with the earned reward) you first need to opt out from auto renewal. 
    <br/><span>This option can be selected either at the point of staking or when the opt out window opens. Only opted out stakers will have an option to claim the stake. Note that this is no partial withdrawal as such.</span>
    <br/><span>For example if you have staked 100 AGI and have earned 10 AGI, when you opt out the entire 110 AGI is available for claim and <b>will not be carried into the next stake window</b>. So if you want to claim only 50 AGI and want the remaining 60 AGI to continue in the stake window you will have to stake the 60 AGI during the next stake window.</span>
    </p>`,
  },
  {
    question: "In the stake cycle when does the opt-out window open?",
    answer: `<p>In our current schedule the opt-out window (period when you can choose to withdraw your stake and the corresponding reward) opens during the last seven days of the current stake period. It coincides with the next stake window.</p>`,
  },
  {
    question: "When does the next stake window open?",
    answer: `<p>In our current schedule the next stake window (period when you can stake) opens during the last seven days of the stake period. Each stake period is for 30 days.</p>`,
  },
  {
    question: "When can I claim my rewards?",
    answer: `<p>In order to withdraw your stake (staked amount along with the earned reward) you first need to opt out from auto renewal. 
    <br/><span>This option can be selected either at the point of staking or when the opt out window opens. Only opted out stakers will have an option to claim the stake.</span>
    <br/><span>After you have opted out you can claim your complete stake and earned reward once the stake period is finished. You will see this option in the claims tab and claims will be enabled only after the stake period is finished</span></p>`,
  },
  {
    question: "I staked on the site, but I see the amount staked as 0, why?",
    answer: `
    Staking tokens is a two step process. 
    <ul>
    <li>Approve tokens - First metamask interaction</li>
    <li>Deposit tokens - Second metamask interaction</li>
    </ul>Ensure that you have performed both transactions.`,
  },
  {
    question: "I am unable to view my stake after I login. What should I do?",
    answer: `<p>Stakes are displayed based on the ethereum account used to stake.<br/>
    Ensure that you are logged in and metamask account is set to the ethereum address you used to stake tokens
    </p>`,
  },
];
