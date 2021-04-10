import React from 'react'
import {Container,Base} from './styles/progress'
function Progress({percent}) {
    return (
        <Container>
            <Base percent={percent}>{percent}%</Base>
        </Container>
    )
}

export default Progress
