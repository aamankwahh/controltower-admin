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
                                        <div class="text-h6 text-primary">My Account</div>
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
                    <div class="col comp-grid" >
                        <div class="">
                            <div >
                                <div class="relative-position" style="min-height:100px">
                                    <div class="row q-col-gutter-x-md">
                                        <div class="col">
                                            <template v-if="pageReady">
                                                <div>
                                                    <q-card class="q-pa-lg q-mb-md nice-shadow-18">
                                                        <div class="row q-col-gutter-lg">
                                                            <div class="col-auto">
                                                                <image-viewer :ratio="1/1" image-size="medium" :src="$auth.userPhoto"></image-viewer>
                                                            </div>
                                                            <div class="col">
                                                                <div class="text-h4 text-primary"> {{ $auth.userName }} </div>
                                                                <div class="text-caption"> {{ $auth.userEmail }} </div>
                                                            </div>
                                                        </div>
                                                    </q-card>
                                                    <div class="row q-col-gutter-md">
                                                        <div class="col-md-2 col-sm-3 col-12">
                                                            <q-card   :flat="isSubPage" class="nice-shadow-18">
                                                                <q-tabs vertical class="text-primary" dense v-model="tab" no-caps inline-label>
                                                                    <q-tab name="accountview" icon="account_box" label="Account Detail" style="justify-content:initial" />
                                                                    <q-tab name="accountedit" icon="edit" label="Edit Account" style="justify-content:initial" />
                                                                    <q-tab name="changepassword" icon="lock" label="Change Password" style="justify-content:initial" />
                                                                </q-tabs>
                                                            </q-card>
                                                        </div>
                                                        <div class="col-md-10 col-sm-9 col-12">
                                                            <q-card   :flat="isSubPage" class="nice-shadow-18 q-pa-sm">
                                                                <q-tab-panels v-model="tab" animated transition-prev="jump-up" transition-next="jump-up">
                                                                    <q-tab-panel name="accountview">
                                                                        <q-item>
                                                                            <q-item-section class="col-auto col-md-3">
                                                                                <q-item-label caption>Id </q-item-label>
                                                                            </q-item-section>
                                                                            <q-item-section>
                                                                                <q-item-label class="text-bold">{{ item.id }}</q-item-label>
                                                                            </q-item-section>
                                                                        </q-item>
                                                                        <q-separator></q-separator>
                                                                        <q-item>
                                                                            <q-item-section class="col-auto col-md-3">
                                                                                <q-item-label caption>Username </q-item-label>
                                                                            </q-item-section>
                                                                            <q-item-section>
                                                                                <q-item-label class="text-bold">{{ item.username }}</q-item-label>
                                                                            </q-item-section>
                                                                        </q-item>
                                                                        <q-separator></q-separator>
                                                                        <q-item>
                                                                            <q-item-section class="col-auto col-md-3">
                                                                                <q-item-label caption>Email </q-item-label>
                                                                            </q-item-section>
                                                                            <q-item-section>
                                                                                <q-item-label class="text-bold">{{ item.email }}</q-item-label>
                                                                            </q-item-section>
                                                                        </q-item>
                                                                        <q-separator></q-separator>
                                                                        <q-item>
                                                                            <q-item-section class="col-auto col-md-3">
                                                                                <q-item-label caption>Phone </q-item-label>
                                                                            </q-item-section>
                                                                            <q-item-section>
                                                                                <q-item-label class="text-bold">{{ item.phone }}</q-item-label>
                                                                            </q-item-section>
                                                                        </q-item>
                                                                        <q-separator></q-separator>
                                                                    </q-tab-panel>
                                                                    <q-tab-panel name="accountedit">
                                                                        <div class="reset-grid">
                                                                            <account-edit-page></account-edit-page>
                                                                            </div>
                                                                        </q-tab-panel>
                                                                        <q-tab-panel name="changepassword">
                                                                            <change-password-page></change-password-page>
                                                                        </q-tab-panel>
                                                                    </q-tab-panels>
                                                                </q-card>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-if="loading">
                                                    <div  class="q-pa-lg text-center">
                                                        <q-spinner :size="50" color="accent" indeterminate></q-spinner>
                                                        Loading...
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
</template>
<script setup>
	import {  computed, ref, toRefs, onMounted } from 'vue';
	import { useMeta } from 'quasar';
	import { useApp } from 'src/composables/app.js';
	import { useAuth } from 'src/composables/auth';
	import  AccountEditPage  from "./accountedit.vue";
	import  ChangePasswordPage  from "./changepassword.vue";
	import { useViewPage } from 'src/composables/viewpage.js';
	const props = defineProps({
		id: [String, Number],
		primaryKey: {
			type: String,
			default: 'id',
		},
		pageName: {
			type: String,
			default: 'user',
		},
		routeName: {
			type: String,
			default: 'useraccountview',
		},
		apiPath: {
			type: String,
			default: 'account',
		},
		editButton: {
			type: Boolean,
			default: true,
		},
		deleteButton: {
			type: Boolean,
			default: true,
		},
		exportButton: {
			type: Boolean,
			default: true,
		},
		msgBeforeDelete: {
			type: String,
			default: "Are you sure you want to delete this record?",
		},
		msgAfterDelete: {
			type: String,
			default: "Record deleted successfully",
		},
		showHeader: {
			type: Boolean,
			default: true,
		},
		showFooter: {
			type: Boolean,
			default: true,
		},
		isSubPage: {
			type : Boolean,
			default : false,
		},
	});
	const app = useApp(props);
	const auth = useAuth();
	const page = useViewPage(props);
	//page state
	const { 
		item, 
		loading, 
		pageReady, // api data loaded successfully
	} = toRefs(page.state);
	//page computed propties
	const {
		apiUrl, // page current api path
		currentRecord, // current page record  - Object
	} = page.computedProps;
	useMeta(() => {
		return {
			//set browser title
			title: "My Account"
		}
	});
	//page methods
	const { load,  deleteItem } = page.methods;
	onMounted(()=>{ 
		load();
	});
	const tab = ref('accountview');
</script>
<style scoped>
</style>
