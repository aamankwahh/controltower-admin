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
                                        <div class="text-h6 text-primary">Edit Book</div>
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
                                <template v-if="pageReady">
                                    <div class="row  q-col-gutter-x-md">
                                        <div class="col">
                                            <q-form ref="observer"  @submit.prevent="submitForm()">
                                            <!--[form-content-start]-->
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
                                            <!--[form-content-end]-->
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
                                    </div>
                                </template>
                                <template v-if="loading">
                                    <div class="q-pa-sm text-center">
                                        <q-spinner :size="40" color="accent" indeterminate></q-spinner>
                                    </div>
                                </template>
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
	import { useEditPage } from 'src/composables/editpage.js';
	const props = defineProps({
		id: [String, Number],
		pageName: {
			type: String,
			default: 'book',
		},
		routeName: {
			type: String,
			default: 'bookedit',
		},
		pagePath: {
			type : String,
			default : 'book/edit',
		},
		apiPath: {
			type: String,
			default: 'book/edit',
		},
		submitButtonLabel: {
			type: String,
			default: "Update",
		},
		msgAfterUpdate: {
			type: String,
			default: "Record updated successfully",
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
	});
	const app = useApp();
	const formDefaultValues = Object.assign({
		id: "", 
		title: "", 
		author: "", 
		date_published: "", 
	}, props.pageData);
	const formData = reactive({ ...formDefaultValues });
	function onFormSubmited(response) {
		app.flashMsg(props.msgAfterUpdate);
		if(props.redirect) app.navigateTo(`/book`);
	}
	const rules = computed(() => {
		return {
			id: { required, numeric },
			title: { required },
			author: { required },
			date_published: { required }
		}
	});
	const v$ = useVuelidate(rules, formData); //form validation
	const page = useEditPage(props, formData, v$, onFormSubmited);
	//page state
	const {
		submitted, // form api submitted state - Boolean
		saving, // form api submiting state - Boolean
		loading, // form data loading state - Boolean
		pageReady, // if api data loaded successfully
	} = toRefs(page.state);
	//page computed propties
	const {
		apiUrl, // page current api path
		currentRecord, // current page record  - Object
	} = page.computedProps;
	//page methods
	const { 
		submitForm, // submit form data to api
		isFieldValid, // check if field is validated - args(fieldname)
		getFieldError, //  get validation error message - args(fieldname)
		 // map api datasource  to Select options label-value
	} = page.methods;
	useMeta(() => {
		return {
			//set browser title
			title: "Edit Book"
		}
	});
</script>
<style scoped>
</style>
