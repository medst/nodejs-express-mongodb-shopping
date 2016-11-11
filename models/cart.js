

module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id){
        var storedItem = this.items[id];
        if(!storedItem)
            storedItem = this.items[id] = {item:item, qty:0, price:0};
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.remove = function(id){
        this.totalPrice -= this.items[id].price;
        this.totalQty -= this.items[id].qty;
        delete this.items[id];
    };

    this.changeQty = function(id, num){
        var price = parseInt(this.items[id].price) / parseInt(this.items[id].qty);
        if(parseInt(num) >= 0){
            this.totalPrice -= this.items[id].price;
            this.totalQty -= this.items[id].qty;
            this.items[id].qty = parseInt(num);
            this.items[id].price = parseInt(num) * price;
            this.totalPrice += this.items[id].price;
            this.totalQty += parseInt(num);
        }
    };

    this.generateArray = function(){
        var arr = [];
        for(var id in this.items)
            arr.push(this.items[id]);
        return arr;
    };
};