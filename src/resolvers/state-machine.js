const aws = require('aws-sdk');
async function resolve(action, parameters, resourceName, resource, getCFResources, serverless, serviceConfig) {
    
    switch(action) {
        case 'Ref':
            const cf = await getCFResources(serverless);
            const cfResource = cf.find(x => x.LogicalResourceId == resourceName);
            if(!cfResource) {
                return action;
            }
            return cfResource.PhysicalResourceId;
        case 'Fn::GetAtt':
            switch(parameters[1]) {
                case 'Name':
                    const cf = await getCFResources(serverless);
                    const cfResource = cf.find(x => x.LogicalResourceId == resourceName);
                    if(!cfResource) {
                        return action;
                    }
                    const lastIndex = fnResource.PhysicalResourceId.lastIndexOf(':')
                    return fnResource.PhysicalResourceId.substr(lastIndex + 1);
            }
            break;
    }
    return action;
}

module.exports = resolve;
