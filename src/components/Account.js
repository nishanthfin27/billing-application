import React from 'react'
import { useSelector } from 'react-redux'
import { Card } from '@uifabric/react-cards'
import { Text, } from 'office-ui-fabric-react/lib/Text'
import { Image } from 'office-ui-fabric-react/lib/Image'

const Account = (props) => {
    const user = useSelector(state => state.userDetails)

    return (
        <div><br /><br /><br /><br />
            <div className='detailsDiv'>
                <Card aria-label='Basic vertical card'>
                                <Card.Item>                               
                                        <Card.Item fill >
                                            <div className='leftAlign'>
                                                <Image 
                                                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0829LR23T2Q5DyQkyIds0eM4Vmlwe1acrJQ&usqp=CAU'
                                                    alt='employee details'
                                                />
                                            </div>
                                        </Card.Item>          
                                    <div class='flex-container'>
                                        <div>
                                            <Text>Name :  { user?.username } </Text>
                                        </div>
                                        <div>
                                            <Text>
                                                E-mail :  { user?.email } 
                                            </Text>
                                        </div>
                                        <div>
                                            <Text>
                                                Business Name: {user?.businessName}
                                            </Text>
                                        </div>
                                        <div>
                                            <Text>
                                                Address: { user?.address}
                                            </Text>
                                        </div>
                                    </div>
                                </Card.Item>
                            </Card>
                    </div>
        </div>
    )
}

export default Account
