let renameCount = 0;


const regex = /^(group|circle|rectangle|frame) \d+$/i;

function removeDefaultNumber(name: string) {
  if (regex.test(name)) {
    // Replace the number and the preceding space with an empty string
    renameCount++
    return name.replace(/ \d+$/i, '');
  }
  return name; // Return the original input if it doesn't match the pattern
}

function renameSelfAndChildren(item: SceneNode) {
  switch (item.type) {
    case "FRAME":
    case "GROUP":
      item.name = removeDefaultNumber(item.name);
      item.children.map(child => renameSelfAndChildren(child));
      break;
    default:
      item.name = removeDefaultNumber(item.name)
  }
}

if (figma.currentPage.selection.length !== 0) {
  figma.currentPage.selection.map(selection => {
    renameSelfAndChildren(selection)
  })
} else {
  console.log("no selection")
  figma.currentPage.children.map(child => renameSelfAndChildren(child))
}

figma.notify(`Renamed ${renameCount} layers`)


// Make sure to close the plugin when you're done. Otherwise the plugin will
// keep running, which shows the cancel button at the bottom of the screen.
figma.closePlugin();
