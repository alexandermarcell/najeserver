const stripeAPI = require('../stripe');

async function createCheckoutSession (req, res) {

    const domainUrl = 'http://localhost:3000';

    const { line_items, customer_email } = req.body;
    console.log(req.body)

    //check req body has line items and email
    if( !line_items || !customer_email ) {
        return res.status(400).json({ error: 'missing require session parameters' })
    }

    try {
        const session = await stripeAPI.checkout.sessions.create({
            line_items,
            customer_email,
            shipping_address_collection: { allowed_countries: ['US', 'CA'] },
            mode: 'payment',
            success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${domainUrl}/canceled`,
        });
        res.status(200).json({ sesionId: session.id, })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: 'an error occured, unable to create session, ' })
    }
}

module.exports = createCheckoutSession;