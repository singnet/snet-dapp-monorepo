const imgPath = (directory = "RateReviewImprove", file = "RatingAIServices", extension = "png") =>
  `${process.env.REACT_APP_SNET_CDN}/assets/images/GetStarted/${directory}/${file}.${extension}`;

export const GetStartedDetails = {
  title: "How the AI Publishing Works",
  description: "Have a sneak peak at what we have in our offering",
};

export const GetStartedCategories = [
  {
    title: "Getting Started",
    media: imgPath("RateReviewImprove", "RatingAIServices"),
    content: [
      {
        type: "description",
        value: `<p>If you’re new to development on SingularityNET Platforms, you can get started with our tools and resources for free. If you’re ready to build more advanced capabilities and distribute your AI services on the AI Marketplace, enroll in the Dev Publisher Program for free.</p>`,
      },
      {
        type: "action",
        value: {
          type: "blue",
          btnText: "start enrollment",
        },
        linkTo: "",
      },
    ],
  },
  {
    title: "Managing Your Account",
    media: imgPath("RateReviewImprove", "RatingAIServices"),
    content: [
      {
        type: "description",
        value: `<p>As a member, you have full access to the resources you need to configure AI services and to submit new AI services and updates. If you’ve enrolled as an organization, you can invite additional developers to your team within your account. <a href="/">Learn How to  Manage Your Account.</a></p>`,
      },
    ],
  },
  {
    title: "Building Your AI Services",
    media: imgPath("RateReviewImprove", "RatingAIServices"),
    content: [
      {
        type: "description",
        value: `<p>Take advantage of a comprehensive set of frameworks you can implement in your AI service  to support advanced service capabilities and services other platforms. <a href="/"> View Developer Resources.</a></p>`,
      },
    ],
  },
  {
    title: "Distributing Your AI Services",
    media: imgPath("RateReviewImprove", "RatingAIServices"),
    content: [
      {
        type: "description",
        value: `<p>Lorem ipsum dolor sit amet, sed tempor tincidunt ne, ex choro interpretaris qui. Eu per modo apeirian, modus summo omittantur te nec. Amet elit vituperatoribus ex his. Et natum tractatos euripidis est, sed delenit sensibus deterruisset cu,  explicari ea mel. Lorem Ipsum Link</p>`,
      },
    ],
  },
  {
    title: "Enroll Free Today",
    media: imgPath("RateReviewImprove", "RatingAIServices"),
    content: [
      {
        type: "description",
        value: `<p>Take advantage of a comprehensive set of frameworks you can implement in your AI service  to support advanced service capabilities and services other platforms.</p>`,
      },
      {
        type: "action",
        value: {
          type: "blue",
          btnText: "start enrollment",
        },
        linkTo: "",
      },
    ],
  },
];
