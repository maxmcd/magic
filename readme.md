# Magic

![slap slap slap slap slap slap slap slap](http://38.media.tumblr.com/773b3de3653e0e83ace58cc487d70928/tumblr_nkc5k2NCu81rlw6b1o1_400.gif)

### Setup

1. Create a postgres database called `magictest` or `magic` for production. 
2. Sign up for a [Twilio](http://twilio.com) account. You need to set two ENV variables for the twilio config:

    ```
    export TWILIO_MAGIC_SID="twiliosidgoeshere"
    export TWILIO_MAGIC_TOKEN="twiliosecrettokengoeshere"
    ```
3. Sign up for a [Stripe](https://stripe.com) account. You need to set one ENV variable for Stripe:

    ```
    export STRIPE_MAGIC_API_KEY="stripeapikeygoeshere"
    ```
4. There are a handful of config variables to set to customize your Magic application:

    ```
    export MAGIC_NAME="Magic"
    export MAGIC_PHONE_NUMBER="(646) 760-1925"}
    export MAGIC_PHONE_NUMBER_FORMATTED="+16467601925"
    ```