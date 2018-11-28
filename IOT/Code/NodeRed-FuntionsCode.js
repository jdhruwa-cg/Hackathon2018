//Agro-Bot Architecture Flow

//IOT Sensor Data Filter according to device type from IBM IOT Node
if(msg.deviceType=="pump")
{
	msg.pump=msg.payload;
}

if(msg.deviceType=="tractor")
{
	msg.tractor=msg.payload;
}
return [msg.pump,msg.tractor];



//Static data filter a/c to device type from Cloudant DB
if(msg.deviceType=="pump")
{
	msg.pump=msg.payload[1];
}

if(msg.deviceType=="tractor")
{
	msg.tractor=msg.payload[0];
}
return[msg.pump,msg.tractor];



//Date-Filter for 15 days notification trigger
date1 = (msg.payload[0])[1].InsuranceEndDate;
date2 = new Date();

var date_diff_indays = function(date1, date2) 
{
	dt1 = new Date(date1);

	dt2 = new Date(date2);

	return Math.floor((Date.UTC(dt2.getFullYear(), 
	dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

msg.diff=date_diff_indays(date1,date2);

if(msg.diff<15)
	return msg;




//Http empty payload Filter (generates on every request)
function isEmpty(obj) 
{   
	for(var key in obj) 
	{	
		if(obj.hasOwnProperty(key))				
			return false;	
	}   
	return true;
}

if(isEmpty(msg.payload[0]))
	msg.payload=msg.payload[1];
else
	msg.payload=msg.payload[0];

return msg;




//QuoteFilter : Implemented empty payload filter in Qoute Generation
function isEmpty(obj) 
{		
	for(var key in obj) 
	{	
		if(obj.hasOwnProperty(key))		
			return false;
	}	
	return true;
}

for( var i=0 ;i< msg.payload.length; i++)
{
	if ( isEmpty(msg.payload[i]) )
		msg.payload.splice(i, 1);
}

return msg;



insurance provider

providers input

msg.payload[2]=1;
return msg;
