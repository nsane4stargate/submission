class Mca{
    /* Step 1 */
    constructor(address, data){
       this.address = address;
       this.data    = data;
       
    }

    /* Step 2 */
    toString(){
        return `MCA map - ${this.address}`;
    }

    toStringList(){
        return `MCA map - ${this.addressMap}`;
    }

    /* Step 3 */
    static genesisAddress(){
        const data = []
        Mca.generateMcaAddress(data)
        return new this('224.0.0.0', data);
    }

    static checkoutAddress(ipList){
        console.log(ipList.toString());
        return new this(ipList[0]);  
    }
    

    /* Step 4 */
    static generateMcaAddress(data){
        let first_octect  = 224;
        let second_octect = 0;
        let third_octect  = 0;
        let fourth_octect = 0;
        let maxCount      = 255
        
        
        let right_index = 3;
        let left_index  = 1;
    
        // Push first address
        data.push(`${first_octect}.${second_octect}.${third_octect}.${fourth_octect}`);
    

        // Set current octect value
        let currentOctectValue  = fourth_octect;
        let updateOctectValue   = 0;
        let currentOctect       = 4;
        let previousOctect      = 0;

        if(right_index >= (right_index - left_index)){
            
            while (currentOctectValue < maxCount){
                updateOctectValue = currentOctectValue+1;
                this.generateMcaMap(updateOctectValue, currentOctect, first_octect, second_octect, third_octect, fourth_octect, data);
                currentOctectValue++;
            }
            // Move down the octect
            right_index-1;

            // Beginning of second octect
            if(right_index == left_index && first_octect < 240){
                first_octect   = first_octect+1;
                right_index    = 3;
                left_index     = 1;
                maxCount       = 255;
                currentOctect  = 4;
                previousOctect = 0;
                
            }else{
                previousOctect = currentOctect;
            }
        }

    }

    static generateMcaMap(updateOctectValue, currentOctect, first_octect, second_octect, third_octect, fourth_octect, data){
        let address       = "";
        switch(currentOctect){
            case 4:
                fourth_octect = updateOctectValue;
                break;
            case 3:
                third_octect  = updateOctectValue
                break;
            case 2:
                second_octect = updateOctectValue
                break;
            case 1:
                first_octect  = updateOctectValue
                break;
        }
        address = `${first_octect}.${second_octect}.${third_octect}.${fourth_octect}`;
        data.push(address);
        
    }
}

module.exports = Mca;