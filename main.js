import { Tree } from "./bst.js";


const array = [1, 12, 7, 45, 28, 32, 54, 33, 9]

const tree = new Tree(array);
const root = tree.buildTree();
tree.delete(1);

// const find = tree.find(1);
// console.log(typeof find);



const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

prettyPrint(tree.root);
// prettyPrint(find);