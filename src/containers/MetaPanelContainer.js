import React, { useState } from "react";
import MetaPanel from "../components/metaPanel";

function MetaPanelContainer({
  user,
  currentChannel,
  privateChannel,
  userPosts,
}) {
  const [active, setActive] = useState(0);

  function clickHandler(activeItem) {
    const activeIndex = activeItem === active ? 0 : activeItem;
    setActive(activeIndex);
  }
  function displayPosts() {
    return Object.entries(userPosts).sort((a, b) => b[1].count - a[1].count);
  }
  return (
    !privateChannel &&
    currentChannel && (
      <MetaPanel>
        <MetaPanel.Title> # {currentChannel.name}</MetaPanel.Title>
        <MetaPanel.Accordian
          clicked={clickHandler}
          active={active}
          channel={currentChannel}
          userPosts={displayPosts()}
        />
      </MetaPanel>
    )
  );
}

export default MetaPanelContainer;
