export default {
  message: {
    plsTryAgain: "Please try again soon...",
    unknownError: "One or more errors have occurred",
    invalidData: "Invalid data: {msg}",
    badRequest: "Bad request",
    youAreNotAuthorized: "You are not authorized for this request",
    success: "{msg} successfully!",
    pageDoesNotExist: "This page does not exist",
    pageYouLookingNotFound: "The page you are looking for could not be found.",
    internalServerError: "Error!",
    serverHasDeserted: "One or more errors have occurred. Please try again soon...",
    errorPassword: "Enter wrong password. Please try again..",
    otpExpired: "OTP is Expired. Please try again...",
  },
  labels: {
    continue: "Continue",
    back: "Back",
    cancel: "Cancel",
    update: "Update",
    delete: "Delete",
    change: "Change",
    viewAll: "See all",
    backToHome: "Back to home"
  },
  datetime: {
    labels: {
      day: "Day",
      hour: "Hour",
      minute: "Minute",
      second: "Second",
    },
  },
  auth: {
    title: {
      login: "Log in to your account",
      register: "Sign up for an account"
    },
    labels: {
      account: "Account",
      notAccount: "Don't have an account?",
      userName: 'Account name',
      login: "Sign in",
      signup: "Sign up",
      password: "Password",
      confirmPassword: "Confirm password",
      terms: "terms of policy",
      policy: "personal security",
      acceptPolicy: "I agree with Qulot {terms} as well as {policy}",
      forgotYourPassword: "Forgot your password ?",
      rememberMe: "Remember me",
      signInBelow: "Sign in Below",
      signupNow: "Signup now",
      signupHere: "signup here",
      orYouCan: "or, you can",
      signUpBelow: "Sign up Below",
      withGoogle: "Sign in with Google",
      logout: "Logout",
      updateProfile: "Save",
      securityVerification: "Security Verification",
      send: "Send",
      email: "Email",
      phoneNumber: "Phone Number",
      changeAuthentication: "Change to other authentication",
      unavailableSecurity: "Unavailable security verification?",
      placeholderOtp: "Input code OTP",
      notePhoneNumber: "Enter code with {otpLength} numbers to {phoneNumber}",
      verificationMethod:
        "To secure your account, please finish the below verification request",
      verifiedCode: "Phone number verified code",
      labelPhoneNumber: "Enter phone number",
      requireError: "Code or phone number is incorrect. Please enter again",
    },
    message: {
      unauthorized: "Wrong email address or password",
      plsCheckYourMail: "Please Check Your Email",
      thankForSignUp:
        "Thanks for signing up. Please check your email to complete the process.",
      signUpSuccess: "Successful account registration",
      weGladYouHere: "We're glad you're here",
      signInSuccess: "Logged in successfully",
    },
    placeholder: {
      account: 'Email or phone',
      email: "Input email",
      userName: 'Input account name',
      password: 'Input password',
      confirmPassword: 'Input confirm password',
      oldPassword: 'Input old password',
      newPassword: 'Input new password',
      firstName: "Input first name",
      lastName: "Input last name",
    }
  },
  user: {
    message: {
      doesNotExist: "Account does not exist",
      alreadyExists: "Account already exists",
      alreadySuccess: "Save Success",
    },
    labels: {
      email: "Email",
      password: "Password",
      firstName: "First Name",
      lastName: "Last Name",
      confirmPassword: "Confirm Password",
      account: "Account",
      profile: "Account profile",
      username: "Username",
      oldPassword: "Old password",
      newPassword: "New password",
      changePassword: "Change password",
      verifyAccount: "Verify account",
      verifyByPhone: "Verify by phone number",
      newPhoneNumber: "New phone number",
      newEmail: "New email",
      inputNewCodeVerify: "Enter verification code",
      codeVerify: "Verification code",
      getCode: "Get code",
      resendCode: "Resend code",
      verifyByEmail: "Verify by email",
      verifyDescription: "Protect your accounts and transactions",
      settingNotify: "Setting notification",
      languageNotify: "Notification language",
      languageNotifyDescription: "Email and app notification language settings",
      notifyOnWebsite: "Notice on Website",
      notifyOnWebsiteDescription: "When enabled, you will receive relevant notifications from apps and websites",
      emailMarketing: "Email marketing",
      emailMarketingDescription: "Choose whether or not to receive marketing emails from us",
      settingLanguage: "Setting language",
      languageDisplay: "Language display",
      languageDisplayDescription: "Choose the display language on the web, and the phone",
      settingCurrency: "Currency",
      settingTheme: "Theme",
      typeCurrency: "Type currency",
      typeCurrencyDescription: "Choose the currency to display on the web, and on the phone",
      themeDisplayDescription: "Choose the theme to display on the web, and on the phone"
    },
  },
  wallet: {
    labels: {
      'recharge': "Deposit",
      'withdraw': "Withdraw",
      'changeMoney': 'Swap',
      'methodRecharge': 'Method recharge money',
      'networks': 'Networks',
      'myWallet': 'My wallet',
      'balance': 'Balance',
      'amount': 'Amount',
      'cryptoCurrency': 'Crypto currency',
      'address': 'Address',
      'fee': 'Fee',
      'withdrawMoney': 'Withdraw money',
      'amountChange': 'Amount change',
      'amountChanged': 'Amount changed',
      'inputAmountMoney': 'Input amount money',
      messageAmount: 'Insufficient funds',
      accountAddress: '{account} wallet address'
    },
    message: {
      withdrawSuccess: 'Withdraw success',
      withdrawError: 'Withdraw failed. Please try again..'
    }
  },
  cart: {
    labels: {
      order: "Order",
      selected: "Selected",
      selectedValue: "{value} ticket",
      total: "Total",
      subtotal: "SubTotal",
      myBalance: 'Balance',
      pricePerTicket: "Price per ticket",
      checkout: 'Checkout',
      paymentMethod: 'Payment method',
      choosePaymentMethod: 'Choose payment method',
      accountBalance: 'Account balance',
      checkoutNow: 'Checkout now',
      deleteTicket: 'Delete',
      fee: "Fee",
      product: "Product",
      quantity: "Qty",
      price: "Price",
    }
  },
  product: {
    labels: {
      result: "Lottery results <strong>{id}</strong> date <strong>{date}</strong>",
      estimate: "Jackpot estimated",
      nextDrawing: 'Next prize draw',
      nextSession: 'Next Session',
      dateText: 'Date',
      playNow: 'Play Now',
      orderNow: 'Order now',
      addTicket: 'Add ticket',
      selectRandom: 'Select {number} ticket random',
      selectTicket: 'Select ticket',
      random: 'Random'
    },
  },
  ticket: {
    labels: {
      listTicket: 'List ticket',
      winprize: 'Win Prize',
      statusWait: 'Wait',
      statusStartDial: 'Start Dial',
      statusStartReward: 'Start reward',
      statusFinished: 'Finished',
      timeStartDial: 'Time start dial',
      status: 'Status',
      empty: 'Empty',
      buyTicket: 'Buy ticket for just {price}'
    }
  },
  session: {
    labels: {
      nextDrawing: "Next drawing",
      lastDrawingResult:
        "Drawing results session #{sessionId} date {drawDateTime}",
      labelSession: 'Drawing #{sessionId} date {drawDatetime}',
      drawingResult: 'Result draw',
      findNumber: 'Find number',
      printResult: 'Print results',
      notification: 'Notification',
      lastDrawing: 'Last drawing result',
      periodDrawing: 'Period drawing',
      dayDrawing: 'Day drawing'
    },
  },
  menu: {
    title: {
      homePage: "Home Page",
      product: "Product",
      myTicket: "My Ticket",
      myWallet: "My Wallet",
      introduce: "Introduce",
    },
  },
  payment: {
    message: {
      invalidBalance: "Account does not have sufficient balance",
      invalidMethod: "Payment method not available",
      invalidCurrency: "This currency is not available or used for payment"
    },
  },
  aboutUs: {
    information: {
      title: "Who we are",
      content: "We are an online lottery ticket messenger service providing customers with the opportunity to play the biggest lottery draws, with official lottery tickets, from anywhere in the world. As an independent third-party ticket purchasing service, we have been leading the online lottery industry since 2022, serving as the industry standard with a stellar reputation and professional 24/7 customer service.",
      operatedBy: "The website is operated by QIO, a company registered in Ho Chi Minh (registration number: C77583)."
    },
    services: {
      title: "Play the Biggest Lotteries",
      subtitle: "We offer customers the opportunity to play to win the world's most popular lotteries. Our services provide:",
      service1: "<strong class='text-main'>45+</strong> lotteries with the biggest jackpot prizes, including PowerQ, MegaQ, LiteQ, as well as daily and local draws.",
      service2: "<strong class='text-main'>Results, information, and winning numbers.</strong> The world's leading lotteries. Wide range of playing options, including syndicates, bundles, multi- draws, and subscriptions.",
      service3: "Dedicated mobile apps for <strong class='text-main'>iOS and Android.</strong>"
    },
    guide: {
      title: "How It Works",
      step1: {
        name: "Step 1",
        desc: "Sign-up for a free account."
      },
      step2: {
        name: "Step 2",
        desc: "Choose a lottery to play, pick your numbers, and order your tickets."
      },
      step3: {
        name: "Step 3",
        desc: "Our representatives will purchase official tickets on your behalf."
      },
      step4: {
        name: "Step 4",
        desc: "Our lottery courier service lets you view your scanned tickets online."
      },
      step5: {
        name: "Step 5",
        desc: "We will notify you by email or SMS when you win."
      },
      step6: {
        name: "Step 6",
        desc: "Paid out 100% commission-free."
      },
    },
    businessModel: {
      title: "Our Business Model",
      desc: "We purchase official lottery tickets on behalf of our customers and our revenue stems solely from a service fee included with the sale of these tickets. When our customers win, they will receive the full amount of the prize without having to pay any further commissions."
    },
    trackRecord: {
      title: "Our Track Record",
      desc: "Over the years, we have paid out more than $10 million in prizes to over 1 million winning tickets from around the world. Our winners include a woman from Vietnam who won an incredible $3 million PowerQ jackpot."
    },
    simpleSecure: {
      title: "Simple and Secure",
      simpleSecure1: "Transactions and assets are protected by blockchain technology",
      simpleSecure2: "Money-back guarantee on your first purchase",
      simpleSecure3: "Scanned copy proves your ownership of the ticket",
      simpleSecure4: "Full suite of self-limiting tools to strongly encourage responsible gaming habits",
      simpleSecure5: "Customer support in many languages via several channels",
      simpleSecure6: "Transactions and assets are protected by blockchain technology.",
    }
  },
  contactUs: {
    information: {
      title: "Contact us",
      content: "Email Our team of lottery experts is prepared to provide a quick and thorough response to all your questions and concerns via email. Just fill in the required fields below, and receive lottery help straight to your on-site mailbox in less than 24 hours."
    },
    labels: {
      FirstName: "First Name",
      EmailAddress: "Email address",
      Topic: "Topic",
      Subject: "Subject",
      YourMessenger: "Your messenger",
      PlaceholderFirstName: "Enter email",
      PlaceholderEmailAddress: "Enter address",
      PlaceholderTopic: "Select topic",
      PlaceholderSubject: "Select subject",
      PlaceholderYourMessenger: "Enter  your messenger",
      Send: "Send"
    }
  }
};
