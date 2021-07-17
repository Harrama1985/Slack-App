import React from "react";
import { connect } from "react-redux";
import GridContainer from "../components/gridContainer";
import MessagesContainer from "../containers/MessagesContainer";
import MetaPanelContainer from "../containers/MetaPanelContainer";
import SideColorContainer from "../containers/SideColorContainer";
import SidePanelContainer from "../containers/SidePanelContainer";

function Home({
  user,
  currentChannel,
  privateChannel,
  userPosts,
  primColor,
  secondColor,
}) {
  return (
    <GridContainer>
      <SideColorContainer user={user} />

      <GridContainer.SideBar primColor={primColor}>
        <SidePanelContainer user={user} currentChannel={currentChannel} />
      </GridContainer.SideBar>
      <GridContainer.Content secondColor={secondColor}>
        <MessagesContainer user={user} currentChannel={currentChannel} />
        <MetaPanelContainer
          currentChannel={currentChannel}
          privateChannel={privateChannel}
          userPosts={userPosts}
        />
      </GridContainer.Content>
    </GridContainer>
  );
}
const mapStateToProps = ({ user, channel, colors }) => ({
  currentChannel: channel.currentChannel,
  user: user.currentUser,
  privateChannel: channel.privateChannel,
  userPosts: channel.userPosts,
  primColor: colors.primColor,
  secondColor: colors.secondColor,
});
export default connect(mapStateToProps)(Home);
