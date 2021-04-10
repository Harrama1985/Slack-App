import React from 'react'
import {Container,Title,Accordian,Item,ItemTitle,ItemContent,Post,Image,PostName,PostCount,Info} from './styles/metaPanel'

export default function MetaPanel({children,...restProps}) {
    return (
        <Container {...restProps}>
            {children}
        </Container>
    )
}

MetaPanel.Title=({children})=>{
    return <Title>{children}</Title>
}

MetaPanel.Accordian=({clicked,active,channel,userPosts})=>{    //accordian howa div li kitja3 divat li kithalo witseddo

    return (<Accordian>
        <Item >
            <ItemTitle onClick={()=>clicked(1)} >channel details</ItemTitle>
            {active === 1 && <ItemContent>{channel.description}</ItemContent> }
        </Item>
        <Item>
            <ItemTitle onClick={()=>clicked(2)} >top posted</ItemTitle>
            {active === 2 && <ItemContent>
                {/* had userPOt jaya men props machi redux */}
            {userPosts.map(post=>(
                    <Post key={post[0]}>
                        <Image src={post[1].avatar}/>
                        <Info>
                            <PostName>{post[0]}</PostName>
                           <PostCount>({post[1].count}) {post[1].count>0 ? 'Posts':'Post'}</PostCount>
                        </Info>
                    </Post>
                ))} 
            </ItemContent> }
        </Item>
        <Item>
            <ItemTitle onClick={()=>clicked(3)} >created by</ItemTitle>
            {active === 3 && <ItemContent>{channel.createdBy.userName}</ItemContent> }
        </Item>
    </Accordian>)
}