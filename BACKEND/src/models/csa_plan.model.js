import mongoose from "mongoose"

const { Schema } = mongoose;

const subscriptionSchema = new Schema(
    {
        farmerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Farmer', // Reference to the User model
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Stock', // Reference to the Stock model
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1, // Ensuring at least 1 product is ordered
              },
            },
          ],
        total_estimated_price : {
            type : Number,
            required : true,
        },
        initial_price : {
            type : Number ,
            required : true ,
        }
    }
) 

export const CSA_plan = mongoose.model('CSA_plan', subscriptionSchema );
//this schema will be displayed to the farmer using a form and then un farmer listing page using farmer id the csa subscription plan will be displayed. now in controller i need a function where if(subription){integrate payment} wil be passed and on calling the route this function will be displayed
//controller and routes yet to be planned