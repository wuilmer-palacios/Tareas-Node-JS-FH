
SELECT Id, Name, RecordTypeId, Account.hed__Primary_Contact__c, Test_Score__c, CreatedDate, StageName FROM Opportunity where RecordTypeId <> '0121U000000GOnWQAW' AND Test_Score__c = '' AND StageName <> 'Closed Lost' order by CreatedDate DESC

list<Opportunity> lsopp = [SELECT Id, Name, RecordTypeId, Account.hed__Primary_Contact__c, Test_Score__c, CreatedDate, StageName FROM Opportunity where RecordTypeId <> '0121U000000GOnWQAW' AND Test_Score__c = '' AND StageName <> 'Closed Lost' order by CreatedDate DESC];

system.debug(lsopp);

list<Opportunity> lsopp = [SELECT Id, Name, RecordTypeId, Account.hed__Primary_Contact__c, Test_Score__c, CreatedDate, StageName FROM Opportunity where RecordTypeId <> '0121U000000GOnWQAW' AND Test_Score__c = '' AND StageName <> 'Closed Lost' order by CreatedDate DESC];

system.debug(lsopp);
list<hed__Test__c> createTest = New List<hed__Test__c>();

for(Opportunity opp:lsopp){
    system.debug(opp);
    hed__Test__c TestOpp = New 	hed__Test__c(hed__Contact__c = opp.Account.hed__Primary_Contact__c, Oportunidad__c = opp.Id, hed__Test_Type__c = 'Admisiones');
    createTest.add(TestOpp);
}
system.debug(createTest);

list<Opportunity> listCampaignMember = [SELECT Id, CampaignId, LeadId, ContactId, CreatedDate FROM CampaignMember WHERE CampaignId = '7011U00000066sDQAQ' order by CreatedDate desc];

