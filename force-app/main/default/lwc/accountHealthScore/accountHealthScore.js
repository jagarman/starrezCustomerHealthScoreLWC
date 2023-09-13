import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const fields = [
    'Account.Customer_Health_Score__c',
    'Account.CHS_Account_Engagements_Score__c',
    'Account.CHS_NPS_Score__c',
    'Account.CHS_Pendo_Active_Days_Score__c',
    'Account.CHS_Services_CSAT_Score__c',
    'Account.CHS_Support_CSAT_Score__c',
    'Account.CHS_Support_Ticket_Volume_Score__c',
    'Account.CHS_Booster_Board_Member__c',
    'Account.CHS_Booster_Case_Study_Participation__c',
    'Account.CHS_Booster_Conference_Presenter__c',
    'Account.CHS_Booster_StarRez_Event_Dinner__c',
    'Account.CHS_Booster_SR_Exec_Success_Validation__c',
    'Account.CHS_Bummer_Acquisition_or_Merger__c',
    'Account.CHS_Bummer_Cancelation_Case__c',
    'Account.CHS_Bummer_Customer_at_Risk_Case__c',
    'Account.CHS_Bummer_Escalation_Case__c',
    'Account.CHS_Bummer_Primary_User_Champion_Left__c',
    'Account.CHS_Bummer_Active_RFP__c'
];

export default class CustomerHealthScore extends LightningElement {
    @api recordId;
    isLoading = true;
    error;

    @wire(getRecord, { recordId: '$recordId', fields })
    wiredAccount({ error, data }) {
        if (data) {
            this.account = data;
            this.isLoading = false;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.isLoading = false;
            this.account = undefined;
        }
    }

    get overviewTabColor() {
        const score = this.account.fields.Customer_Health_Score__c.value;
        if (score >= 8) {
            return 'bg-green';
        } else if (score >= 5) {
            return 'bg-yellow';
        } else {
            return 'bg-red';
        }
    }

    get isCancellationPending() {
        return this.account.fields.CHS_Bummer_Cancelation_Case__c.value === -10;
    }
}