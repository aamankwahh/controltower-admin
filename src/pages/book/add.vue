<template>
    <div class="main-page">
        <template v-if="showHeader">
            <q-card  :flat="isSubPage" class="page-section q-py-sm q-px-md q-mb-md nice-shadow-18" >
                <div class="container">
                    <div class="row justify-between q-col-gutter-md">
                        <div class="col-12 col-md-auto " >
                            <div class="" >
                                <div class="row  items-center q-col-gutter-sm q-px-sm">
                                    <div class="col">
                                        <div class="text-h6 text-primary">Add New Book</div>
                                    </div>
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
                                                Id *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <q-input outlined dense  ref="ctrlid" v-model.trim="formData.id"  label="Id" type="number" placeholder="Enter Id"   step="any"    
                                                class="" :error="isFieldValid('id')" :error-message="getFieldError('id')">
                                                </q-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Title *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <q-input outlined dense  ref="ctrltitle" v-model.trim="formData.title"  label="Title" type="text" placeholder="Enter Title"      
                                                class="" :error="isFieldValid('title')" :error-message="getFieldError('title')">
                                                </q-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Author *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <q-input outlined dense  ref="ctrlauthor" v-model.trim="formData.author"  label="Author" type="text" placeholder="Enter Author"      
                                                class="" :error="isFieldValid('author')" :error-message="getFieldError('author')">
                                                </q-input>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="row">
                                            <div class="col-sm-3 col-12">
                                                Date Published *
                                            </div>
                                            <div class="col-sm-9 col-12">
                                                <q-input outlined dense  v-model="formData.date_published" label="Date Published"    :error="isFieldValid('date_published')" :error-message="getFieldError('date_published')">
                                                <template v-slot:append>
                                                    <q-icon name="date_range" class="cursor-pointer">
                                                    <q-popup-proxy ref="ctrldate_published" transition-show="scale" transition-hide="scale">
                                                    <q-date   mask="YYYY-MM-DD" v-model="formData.date_published" @input="$refs.ctrldate_published.hide()" />
                                                    </q-popup-proxy>
                                                    </q-icon>
                                                </template>
                                                </q-input>      
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="showSubmitButton" class="text-center q-my-md">
                                    <q-btn type="submit"    :rounded="false"  color="primary"  no-caps  unelevated    icon-right="send" :loading="saving">
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
	import { required, numeric, } from 'src/services/validators';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app.js';
	import { useAddPage } from 'src/composables/addpage.js';
	const props = defineProps({
		pageName : {
			type : String,
			default : 'book',
		},
		routeName : {
			type : String,
			default : 'bookadd',
		},
		apiPath : {
			type : String,
			default : 'book/add',
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
	const formDefaultValues = Object.assign({
		id: "", 
		title: "", 
		author: "", 
		date_published: "", 
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
		if(props.redirect) app.navigateTo(`/book`);
	}
	//form validation rules
	const rules = computed(() => {
		return {
			id: { required, numeric },
			title: { required },
			author: { required },
			date_published: { required }
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
			title: "Add New Book"
		}
	});
	// expose page object for other components access
	defineExpose({
		page
	});
</script>
<style scoped>
</style>
