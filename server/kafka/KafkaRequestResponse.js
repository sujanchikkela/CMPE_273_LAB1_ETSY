const kafkaConnection = require('./Connect')
const uuid = require('uuid').v4


module.exports = class KafkaRequestResponse {

    requests = {}
    constructor() {}

    consumer = kafkaConnection.getConsumer('acknowledge')

    kafkaRequest(topicName,payload,results){
        var producer = kafkaConnection.getProducer()

        const correlationId = uuid()
        var entry = {
            results: results
        }

        this.requests[correlationId] = entry

        console.log("CorrelationId :" ,correlationId)
        this.kafkaResponse(function(){
            producer.on('ready',function() {
                let payloads = [
                    {topic: topicName,messages: JSON.stringify({payload,correlationId}),partition:0}
                ]
                console.log("3. Producer sending data ...")
                producer.send(payloads,function(err,data){
                    console.log("ERR ",err)
                    console.log("DATA ",data)
                })
            })
        })
    }

    kafkaResponse(next){
        let requestsWaiting = this.requests
        
        this.consumer.on('message', function (message) {
            console.log("Response recieved :",message)

            var acknowledgementData = JSON.parse(message.value)
            var correlationId = acknowledgementData.payload.correlationId

            console.log("CorreleationID: ",correlationId)
            console.log("request:", requestsWaiting)
            if (correlationId in requestsWaiting) {

                var entry = requestsWaiting[correlationId]

                delete requestsWaiting[correlationId]

                if(acknowledgementData.payload.status === 200){
                    console.log("200",acknowledgementData.payload.content)
                    return entry.results(null, acknowledgementData.payload.content)
                }

                if(acknowledgementData.payload.status === 400){
                    return entry.results(acknowledgementData.payload.content, null)   
                }

                return entry.results('Server Error', null)   
            }
        });
        this.requests = requestsWaiting
        return next()
    }
}