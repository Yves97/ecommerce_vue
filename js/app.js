new Vue({
    el: '#app',
    data: {
        linkTitle: 'Simple E-Commerce App',
        viewingCartMessage: 'Voir Le panier',
        isShowingCart: false,
        showingDetails: false,
        route: '/',
        cart: {
            items: []
        },
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 299789,
                inStock: 50,
                img: '/img/macbookpro.jpeg'
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 180550,
                inStock: 78055,
                img: '/img/samsung-note7.jpeg'
                
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149894,
                inStock: 5,
                img: '/img/hp-officejet.jpg'
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 120000,
                inStock: 42,
                img:'/img/apple-iphone-7-plus.png'
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 177800,
                inStock: 0,
                img: '/img/macbookpro.jpeg'
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 197078,
                inStock: 81,
                img: '/img/oneplus_7.jpg'
            }
        ]
    },
    methods:{
        addProductToCart: function(product){
            var cartItem = this.getCartItem(product)
            if(cartItem != null){
                cartItem.quantity++
            }
            else{
                this.cart.items.push({
                    product: product,
                    quantity: 1
                })
            }

            product.inStock--
        },
        getCartItem: function(product){
            for(let i =0;i<this.cart.items.length;i++){
                if(this.cart.items[i].product.id === product.id){
                    return this.cart.items[i]
                }
            }
            return null
        },
        increaseQuantity: function(cartItem){
            cartItem.product.inStock--
            cartItem.quantity++
        },
        decreaseQuantity: function(cartItem){
            cartItem.quantity--
            cartItem.product.inStock++
            if(cartItem.quantity == 0){
                this.removeItemFromCart(cartItem)
            }

        },
        removeItemFromCart: function(cartItem){
            var index = this.cart.items.indexOf(cartItem)
            if(index !== 1){
                this.cart.items.splice(index,1)
            }
        },
        checkout: function(){
            if(confirm('Are u sure that you want to purchase these product')){
                this.cart.items.forEach((value)=>{
                    value.product.inStock += value.quantity
                })
                this.cart.items = []
            }
        },
        details: function(index){
            console.log(index)
        }
    },
    computed:{
        cartTotal: function(){
            var total = 0
            this.cart.items.forEach((value)=>{
                total += value.quantity * value.product.price 
            })
            return total
        },
        taxAmount: function(){
            return (this.cartTotal * 10) / 100
        }
        // grandTotal: function(){
        //     return this.cartTotal + this.taxAmount
        // }
    },

    filters:{
        currency: function(value){
            var formatter = new Intl.NumberFormat('ci-Ci',{
                style: 'currency',
                currency: 'XOF'
            })
            return formatter.format(value)
        }
    }
});
