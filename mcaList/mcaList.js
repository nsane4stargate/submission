const Mca = require('./mca');

class McaList{
    constructor(){
        this.list = [Mca.genesisAddress()];
        console.log(this.list)
    }

    /* Step 7*/
    checkInAddress(addressMap){
        this.list.push(addressMap);
        this.list.sort();

        return addressMap;
    }

    checkOutAddress(data){
        const list = Mca.checkoutAddress(data)
        return list;
    }

    /*Step 10 */
    replaceList(updatedList){
        if(updatedList.length < this.list.length || updatedList.length > this.list.length ){
            console.log('Replacing the MCA address list with the new MCA address list')
            return;
        }
        this.list = updatedList;
    }   
}
 
module.exports = McaList;
