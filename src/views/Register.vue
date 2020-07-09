<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
                id="email"
                type="text"
                v-model.trim="email"
                :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small
                class="helper-text invalid"
               v-if="$v.email.$dirty && !$v.email.required"
        >{{'Email_empty'|localize}}</small>
        <small class="helper-text invalid"
               v-else-if="$v.email.$dirty && !$v.email.email"
        >{{'Enter_correct_Email'|localize}}</small>
      </div>
      <div class="input-field">
        <input
                id="password"
                type="password"
                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                v-model.trim="password"
        >
        <label for="password">{{'Password'|localize}}</label>
        <small class="helper-text invalid"
               v-if="$v.password.$dirty && !$v.password.required"
        >{{"Enter_password"|localize}}</small>
        <small class="helper-text invalid"
               v-else-if="$v.password.$dirty && !$v.password.minLength"
        >{{'Message_MinLength'|localize}} {{$v.password.$params.minLength.min}}{{'Mes_MinLength'|localize}} {{password.length}}</small>
      </div>
      <div class="input-field">
        <input
                id="name"
                type="text"
                v-model.trim="name"
                :class="{invalid: ($v.name.$dirty && !$v.name.required) }"

        >
        <label for="name">{{'Name'|localize}}</label>
        <small class="helper-text invalid"
               v-if="$v.name.$dirty && !$v.name.required"
        >{{'Message_EnterName'|localize}}</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>{{'AcceptRules'|localize}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
                class="btn waves-effect waves-light auth-submit"
                type="submit"
        >
          {{'Register'|localize}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{'HasAccount'|localize}}
        <router-link to="/login">
          {{'LoginA'|localize}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>

    import { required, minLength, email } from 'vuelidate/lib/validators'

    export default {
        name: "Register",
      metaInfo() {
        return{
          title: this.$title('ProfileTitle')
        }
      },
        data: () => ({
            email: "",
            password: "",
            name: '',
            agree: false
        }),
        validations: {
            email: {
                required,
                email
        },
            password: {
                required,
                minLength: minLength(6)
            },
            name:{
                required
            },
            agree:{ checked:v => v}
        },
        methods: {
         async submitHandler(){
                if(this.$v.$invalid){
                    this.$v.$touch()
                    return
                }

                const formData={
                    email: this.email,
                    password: this.password,
                    name: this.name,
                }
              try{
                  await this.$store.dispatch('register',formData)
                  this.$router.push('/')
              }catch (e) {
                  // console.log('error in fetching posts')
              }
            }
        }
    }
</script>

<style scoped>

</style>