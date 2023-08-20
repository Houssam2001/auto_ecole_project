 function getStatus(params) {
    if(params>2000){
        return 'Bien'
    }
    return 'pas bien'
}

export {getStatus}