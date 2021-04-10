import React from 'react'
import SidePanel from '../components/sidePanel'
import ChannelsContainer from './ChannelsContainer'
import DropDownContainer from './DropDownContainer'
import StartedContainer from './StartedContainer'
import UsersContainer from './UsersContainer'

function SidePanelContainer({user,currentChannel}) {
    return (
        
        <SidePanel>
        <SidePanel.Logo>
            <SidePanel.Title>{'</>'}devchat</SidePanel.Title>
        </SidePanel.Logo>

        <SidePanel.Box>
            <DropDownContainer/>
        </SidePanel.Box>
        <SidePanel.Box>
            <StartedContainer user={user} currentChannel={currentChannel}/>
        </SidePanel.Box>
        <SidePanel.Box>
            <ChannelsContainer user={user} currentChannel={currentChannel}/>
        </SidePanel.Box>
        <SidePanel.Box>
            <UsersContainer user={user}/>
        </SidePanel.Box>
    </SidePanel>
    )
}

export default SidePanelContainer
