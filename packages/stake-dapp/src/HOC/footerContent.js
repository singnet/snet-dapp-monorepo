const PrimaryFooterLeft = [
  { label: "Contact Us", link: "https://singularitynet.io/#contact" },
  { label: "Foundation Main Site", link: "https://singularitynet.io/" },
  { label: "Singularity Studio", link: "https://singularitynet.io/studio/" },
  { label: "White Paper", link: "https://public.singularitynet.io/whitepaper.pdf" },
  { label: "Jobs", link: "https://singularitynet.io/jobs-temp/" },
];

const PrimaryFooterMain = [
  {
    title: "AGI Staking",
    children: [
      { label: "How it Works", link: "/howitworks" },
      { label: "Stake Calculator", link: "/howitworks" },
    ],
  },
  {
    title: "Dev Docs",
    children: [
      { label: "What is Staking", link: "https://dev.singularitynet.io/products/staking/" },
      { label: "Stages of Staking", link: "https://dev.singularitynet.io/products/stake-timeline/" },
      { label: "Auto Renewing", link: "https://dev.singularitynet.io/products/stake-opt-out/" },
      { label: "Rewards", link: "https://dev.singularitynet.io/products/stake-reward/" },
    ],
  },
  {
    title: "Products",
    children: [
      { label: "AI Marketplace", link: "https://beta.singularitynet.io" },
      { label: "AI Publisher", link: "https://publisher.singularitynet.io" },
      { label: "Request For AI (RFAI)", link: "https://rfai.singularitynet.io" },
      { label: "Stake", link: "https://staking.singularitynet.io" },
    ],
  },
  {
    title: "Community",
    children: [
      { label: "Blog", link: "http://blog.singularitynet.io/" },
      { label: "Forum", link: "https://community.singularitynet.io/" },
      { label: "Telegram", link: "https://telegram.me/singularitynet" },
    ],
  },
];

const SecondaryFooter = [
  { title: "Github", className: "fab fa-github", link: "https://github.com/singnet" },
  { title: "Twitter", className: "fab fa-twitter", link: "https://twitter.com/singularity_net" },
  { title: "Facebook", className: "fab fa-facebook-f", link: "https://www.facebook.com/singularityNET.io" },
  { title: "Linkedin", className: "fab fa-linkedin-in", link: "https://www.linkedin.com/company/singularitynet/" },
  { title: "Youtube", className: "fab fa-youtube", link: "https://www.youtube.com/channel/UCbTE8vfz5zuEK5uRnc2yjrw" },
  { title: "Instagram", className: "fab fa-instagram", link: "https://instagram.com/singularitynet.io" },
];

export const FooterData = {
  PrimaryFooterLeft,
  PrimaryFooterMain,
  SecondaryFooter,
};
