export default GET = (request) => {

    const users = [
        {id: 1 , name: 'Magdy'}
    ]

    return new Response(JSON.stringify(users))
    
}