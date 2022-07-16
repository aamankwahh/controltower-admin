<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md q-mb-md nice-shadow-18" >
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-md-8 col-12 " >
                            <div class="" >
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col">
                                        <div class="text-h6 text-primary">User registration</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 col-12 comp-grid" >
                            <div class="">
                                <div>
                                    Already have an account?  
                                    <q-btn     :rounded="false"  no-caps  unelevated    color="accent" icon="account_box" to="/"> Login</q-btn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </q-card>
        </template>
        <section class="page-section " >
            <div class="container">
                <div class="row q-col-gutter-x-md">
                    <div class="col-md-9 col-12 comp-grid" >
                        <q-card  :flat="isSubPage" class="q-pa-md nice-shadow-18">
                            <div >
                                <q-form ref="observer" @submit.prevent="submitForm()">
                                <div class="row q-col-gutter-x-md">
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Username *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <check-duplicate error-msg="Not available" v-model="formData.username" check-path="components_data/user_username_exist/" v-slot="checker">
                                                <q-input outlined dense  ref="ctrlusername" @blur="checker.check" :loading="checker.loading" v-model.trim="formData.username"  label="Username" type="text" placeholder="Enter Username"      
                                                class="" :error="isFieldValid('username') || checker.alreadyExist" :error-message="getFieldError('username') || checker.errorMsg">
                                                </q-input>
                                                </check-duplicate>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Email *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <check-duplicate error-msg="Not available" v-model="formData.email" check-path="components_data/user_email_exist/" v-slot="checker">
                                                <q-input outlined dense  ref="ctrlemail" @blur="checker.check" :loading="checker.loading" v-model.trim="formData.email"  label="Email" type="email" placeholder="Enter Email"      
                                                class="" :error="isFieldValid('email') || checker.alreadyExist" :error-message="getFieldError('email') || checker.errorMsg">
                                                </q-input>
                                                </check-duplicate>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Password *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <q-input outlined dense  ref="ctrlpassword" v-model="formData.password"  label="Password" :type="isPwd ? 'password' : 'text'" placeholder="Enter Password"      
                                                class="" :error="isFieldValid('password')" :error-message="getFieldError('password')">
                                                <template v-slot:append>
                                                    <q-icon
                                                    :name="isPwd ? 'visibility_off' : 'visibility'"
                                                    class="cursor-pointer"
                                                    @click="isPwd = !isPwd"
                                                    />
                                                </template>
                                                </q-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Confirm Password *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <q-input outlined dense  ref="ctrlconfirmpassword" v-model="formData.confirm_password" :type="isCPwd ? 'password' : 'text'" label="Confirm Password" placeholder="Confirm Password"  :error="isFieldValid('confirm_password')" :error-message="getFieldError('confirm_password')">
                                                <template v-slot:append>
                                                    <q-icon
                                                    :name="isCPwd ? 'visibility_off' : 'visibility'"
                                                    class="cursor-pointer"
                                                    @click="isCPwd = !isCPwd"
                                                    />
                                                </template>
                                                </q-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Photo 
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <div class="q-mb-sm">
                                                    <q-uploader-input :max-files="1" :max-file-size="3" accept=".jpg,.png,.gif,.jpeg" :multiple="false" delete-icon="clear" style="width:100%" label="Choose files or drop files here" upload-path="fileuploader/upload/photo" v-model="formData.photo"></q-uploader-input>
                                                    <!-- <small class="q-pa-sm text-negative"></small> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Phone *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <q-input outlined dense  ref="ctrlphone" v-model.trim="formData.phone"  label="Phone" type="text" placeholder="Enter Phone"      
                                                class="" :error="isFieldValid('phone')" :error-message="getFieldError('phone')">
                                                </q-input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="showSubmitButton" class="text-center q-my-md">
                                    <q-btn    :rounded="false"  color="primary"  no-caps  unelevated   type="submit" icon-right="send" :loading="saving">
                                        {{ submitButtonLabel }}
                                        <template v-slot:loading>
                                            <q-spinner-oval />
                                        </template>
                                    </q-btn>
                                </div>
                                </q-form>
                                <slot :submit="submitForm" :saving="saving"></slot>
                            </div>
                        </q-card>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script setup>
	import {  computed, ref, reactive, toRefs } from 'vue';
	import useVuelidate from '@vuelidate/core';
	import { required, email, sameAs, } from 'src/services/validators';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import { useAddPage } from 'src/composables/addpage.js';
	const props = defineProps({
		pageName : {
			type : String,
			default : 'user',
		},
		routeName : {
			type : String,
			default : 'useruserregister',
		},
		apiPath : {
			type : String,
			default : 'auth/register',
		},
		submitButtonLabel: {
			type: String,
			default: "Submit",
		},
		msgAfterSave: {
			type: String,
			default: "Record added successfully",
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showSubmitButton: {
			type: Boolean,
			default: true,
		},
		redirect: {
			type : Boolean,
			default : true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
		pageData: { // use to set formData default values from another page
			type: Object,
			default: () => {} 
		},
	});
	const app = useApp();// application state and methods
	const auth = useAuth();
	const formDefaultValues = Object.assign({
		username: "", 
		email: "", 
		password: "", 
		confirm_password: "", 
		photo: "", 
		phone: "", 
	}, props.pageData);
	const formData = reactive({ ...formDefaultValues });
	// perform custom validation before submit form
	// set custom form fields
	// return false if validation fails
	function beforeSubmit(){
		return true;
	}
	// after form submited to api
	// reset form data.
	// redirect to another page
	function onFormSubmited(response) {
		app.flashMsg(props.msgAfterSave);
		Object.assign(formData, formDefaultValues); //reset form data
		const loginData = response;
		// user registration completed. navigation to home page
		if (loginData.token) {
			auth.saveLoginData(loginData, false);
			location.href = "/";
		}
		else{
			app.flashMsg(loginData.message);
			app.navigateTo(loginData.nextpage);
		}
	}
	//form validation rules
	const rules = computed(() => {
		return {
			username: { required },
			email: { required, email },
			password: { required },
			confirm_password: {required, sameAs: sameAs(formData.password, 'Password') },
			photo: {  },
			phone: { required }
		}
	});
	const v$ = useVuelidate(rules, formData); // form validation
	// page form hook
	const page = useAddPage({ props, formData, v$, onFormSubmited, beforeSubmit });
	//page state
	const {
		submitted, // form submitted state - Boolean
		saving, // form api submiting state - Boolean
		pageReady, // api data loaded successfully
		isPwd,
		isCPwd,
	} = toRefs(page.state);
	//page methods
	const {
		submitForm, //submit form data to api
		isFieldValid, // check if field is validated - args(fieldname)
		getFieldError, //  get validation error message - args(fieldname)
		 // map api datasource  to Select options label-value
	} = page.methods;
	useMeta(() => {
		return {
			//set browser title
			title: "Add New User"
		}
	});
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
