<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{"Title_login"|localize}}</span>
      <div class="input-field">
        <input
                id="email"
                type="text"
                v-model.trim="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="$v.email.$dirty && !$v.email.required">
        {{"Email_empty"|localize}}
        </small>
        <small class="helper-text invalid"
               v-else-if="$v.email.$dirty && !$v.email.email">
          {{"Enter_correct_Email"|localize}}
          </small>
      </div>
      <div class="input-field">
        <input
                id="password"
                type="password"
                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                v-model="password"
        >
        <label for="password">{{'Password'|localize}}</label>
        <small class="helper-text invalid"
               v-if="$v.password.$dirty && !$v.password.required"
        >{{'Message_EnterPassword'|localize}}</small>

        <small
                class="helper-text invalid"
                v-else-if="$v.password.$dirty && !$v.password.minLength"
        >
          {{'Message_MinLength'|localize}} {{$v.password.$params.minLength.min}}{{'Mes_MinLength'|localize}} {{password.length}}
        </small>
      </div>
    </div>

    <div class="card-action">
      <div>
        <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
        >
          {{'LoginA'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'NoAccount'|localize}}
        <router-link to="/register">{{'Register'|localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
    import {email, minLength, required} from 'vuelidate/lib/validators'
    import messages from '../utils/messages'
    import localizeFilter from '@/filters/localize.filter'

    export default {
        name: "Login",
      metaInfo() {
        return{
          title: this.$title('ProfileTitle')
        }
      },
        data: () => ({
            email: "",
            password: "",
        }),
        validations: {
            email: {
                required,
                email
            },
            password: {
                minLength: minLength(6),
                required

            },
        },
        mounted() {
          if (this.$route.query.locale) {
            let info = {locale: this.$route.query.locale}
            this.$store.commit('setInfo', info)
          }
          if (messages[this.$route.query.message]) {
            this.$message(localizeFilter(messages[this.$route.query.message]))
          }
        },
        methods: {
            async submitHandler() {
                if (this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    email: this.email,
                    password: this.password
                }

                try{
                    await this.$store.dispatch('login', formData)
                    this.$router.push('/')
                }catch (e) {
                    // console.log('error in fetching posts')
                }
            }
        }
    }
</script>

