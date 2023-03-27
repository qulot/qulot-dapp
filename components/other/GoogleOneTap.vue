<template></template>
<script>
import { StatusCodes } from 'http-status-codes'
import { mapGetters } from 'vuex'
export default {
  props: {
    prompt: { type: String, require: true, default: 'login' },
  },
  data() {
    return {
      googleClientId: process.env.googleClientId,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'isAuthenticated',
      jwtToken: 'pages/oauth2/google/getToken',
    }),
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.initialize()
    }
  },
  methods: {
    initialize() {
      if (!window.google) {
        console.warn('Missing google instance')
        return
      }
      // initialize Google Sign in
      window.google.accounts.id.initialize({
        client_id: this.googleClientId,
        //method to run after user clicks the Google sign in button
        callback: this.credentialResponse,
      })

      window.google.accounts.id.prompt()
    },
    /**
     * @param {{clientId: string; credential: string;}} response
     */
    async credentialResponse({ credential }) {
      try {
        await this.$store.dispatch('pages/oauth2/google/oneTabLogin', {
          credential,
        })
        await this.checkToken()
      } catch (err) {
        if (!err.response) {
          console.error(err)
        } else {
          console.error(err.response.data)
        }
        this.$nuxt.error({
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          message: this.$i18n.t('message.unknownError') + '. ' + this.$i18n.t('message.plsTryAgain'),
        })
      }
    },
    async checkToken() {
      if (!this.jwtToken) {
        // override current strategy to local
        this.$nuxt.error({
          statusCode: StatusCodes.BAD_REQUEST,
          message: this.$i18n.t('message.badRequest') + '. ' + this.$i18n.t('message.plsTryAgain'),
        })

        return
      }
      // override current strategy to local
      this.$auth.setStrategy('local')
      // use app token
      await this.$auth.setUserToken(this.jwtToken.accessToken, this.jwtToken.refreshToken)

      // redirect to home
      this.$router.push('/')
    },
  },
}
</script>
