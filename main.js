import { Tree } from "./bst.js";


const array = [20, 30, 36, 34, 32, 40, 50, 70, 60, 65, 80, 75, 85];

const tree = new Tree(array);
const root = tree.buildTree();
tree.delete(34);

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
// tree.levelOrderForEach((item) => {
//     console.log(item);
// })

// tree.preOrderForEach((item) => {
//     console.log(item);
// })

// tree.inOrderForEach((item) => {
//     console.log(item);
// })

// tree.postOrderForEach((item) => {
//     console.log(item);
// })

console.log(tree.isBalanced());
// prettyPrint(find);