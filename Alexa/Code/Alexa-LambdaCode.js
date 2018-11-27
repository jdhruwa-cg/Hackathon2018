'use strict';

/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */


// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: 'PlainText',
            text: output,
        },
        card: {
            type: 'Simple',
            title: `SessionSpeechlet - ${title}`,
            content: `SessionSpeechlet - ${output}`,
        },
        reprompt: {
            outputSpeech: {
                type: 'PlainText',
                text: repromptText,
            },
        },
        shouldEndSession,
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: '1.0',
        sessionAttributes,
        response: speechletResponse,
    };
}


// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    const sessionAttributes = {};
    const cardTitle = 'Welcome';
    const speechOutput = 'Welcome to the Alexa Agro bot. ' +
        'Please tell me how can I help you?';
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    const repromptText = 'Please tell me how can I help you';
    const shouldEndSession = false;

    callback(sessionAttributes,
        buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function handleSessionEndRequest(callback) {
    const cardTitle = 'Session Ended';
    const speechOutput = 'Thank you for trying the Alexa Skills Kit sample. Have a nice day!';
    // Setting this to true ends the session and exits the skill.
    const shouldEndSession = true;

    callback({}, buildSpeechletResponse(cardTitle, speechOutput, null, shouldEndSession));
}

function createFavoriteColorAttributes(favoriteColor) {
    return {
        favoriteColor,
    };
}




function getdeviceinfo(intent, session, callback) {
	const cardTitle = intent.name;
    //const deviceName = intent.slots.device.value;
	const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
    let speechOutput = '';
  
  
    //Api call will get all this data  
    const expirydate = '15-Dec-2018';
    let insuranceProvider = 'YAgro Insurance';
    let insurancePremeium = '$500';
    let insuranceCoverage = 'Wind, Fire';
    let insuranceExpiryDays = 10;
    
    
    
    speechOutput =  `Your farm including crop and equipments is insured by ${insuranceProvider}, your current premium amount is ${insurancePremeium}. Your insurance is going to expire in ${insuranceExpiryDays} days.`

	
	//speechOutput = `Your insurance is going to expire on ${expirydate}, I have published your profile to get best Insurance for you.`
	
	//speechOutput = `I have brought Insurance for you, Your new insurance provide is ${insuranceProvider}, The Annual premium is ${insurancePremeium}`;
	
	

    // Setting repromptText to null signifies that we do not want to reprompt the user.
    // If the user does not respond or says something that is not understood, the session
    // will end.
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
}



function cancelPublishProfile(intent, session, callback) {
    
    //let speechOutput = `Ok, I will remind you in few days again.`
    //this.response.speak(speechOutput);
    //this.emit(':responseReady'); 
    
    const cardTitle = intent.name;    
	const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
	//let device = 'tractor Mahindra Novo 655 DI'   
	let speechOutput = '';

  
  
	speechOutput = `Ok, I will remind you in few days again.`
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
  
    
}



function purchaseInsurance(intent, session, callback) {
    
    const insuranceProvider = intent.slots.insurance.value;
    const cardTitle = intent.name;    
	const repromptText = null;
    const sessionAttributes = {};
    let shouldEndSession = false;
   // let insuranceProvider = 'Crop Insurance';
    let coverage = '$150000';
	let premium = '$650';
	//let device = 'tractor Mahindra Novo 655 DI'   
	let speechOutput = '';
  
  
	speechOutput = `Your Insurance Policy has been purchased, your new insurance provider is ${insuranceProvider}, the total coverage amount is ${coverage} and the annual premium is ${premium}, which covers theft, vandalism, Wind, Fire etc. you can read the details from your mobile dashboard.`
    callback(sessionAttributes,
         buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
  
    
}

// --------------- Events -----------------------

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log(`onSessionStarted requestId=${sessionStartedRequest.requestId}, sessionId=${session.sessionId}`);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log(`onLaunch requestId=${launchRequest.requestId}, sessionId=${session.sessionId}`);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log(`onIntent requestId=${intentRequest.requestId}, sessionId=${session.sessionId}`);

    const intent = intentRequest.intent;
    const intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if (intentName === 'getdeviceinfo') {
        getdeviceinfo(intent, session, callback);
    }
    else if (intentName === 'publishProfileConfirmation') {
        publishProfileConfirmation(intent, session, callback);
    }
    else if (intentName === 'publishProfile'){
        publishProfile(intent, session, callback);
    }
    else if (intentName === 'purchaseInsurance'){
        purchaseInsurance(intent, session, callback);
    }
    else if(intentName === 'cancelPublish')
    {
        cancelPublishProfile(intent, session, callback);
    }
    else if (intentName === 'AMAZON.HelpIntent') {
        getWelcomeResponse(callback);
    } else if (intentName === 'AMAZON.StopIntent' || intentName === 'AMAZON.CancelIntent') {
        handleSessionEndRequest(callback);
    } else {
        throw new Error('Invalid intent');
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log(`onSessionEnded requestId=${sessionEndedRequest.requestId}, sessionId=${session.sessionId}`);
    // Add cleanup logic here
}


// --------------- Main handler -----------------------

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = (event, context, callback) => {
    try {
        console.log(`event.session.application.applicationId=${event.session.application.applicationId}`);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== 'amzn1.echo-sdk-ams.app.[unique-value-here]') {
             callback('Invalid Application ID');
        }
        */

        if (event.session.new) {
            onSessionStarted({ requestId: event.request.requestId }, event.session);
        }

        if (event.request.type === 'LaunchRequest') {
            onLaunch(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'IntentRequest') {
            onIntent(event.request,
                event.session,
                (sessionAttributes, speechletResponse) => {
                    callback(null, buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === 'SessionEndedRequest') {
            onSessionEnded(event.request, event.session);
            callback();
        }
    } catch (err) {
        callback(err);
    }
};
