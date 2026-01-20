class Node {
    constructor(value = null, left=null, right=null) {
        this.value = data,
        this.left = left,
        this.right = right
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root;
    }

    buildTree(array) {
        if (array.length === 0) {
            throw new Error("Array is empty");
        }
        else {
            const uniqueArray = [...new Set(array)];
            uniqueArray.sort((a, b) => a - b);
            const start = 0;
            const end = uniqueArray.length - 1;

            this.root = build(uniqueArray, start, end);
            return this.root;
        }


        function build(array, start, end) {
            if (start > end) {
                return null;
            }
            const mid = (start + end)/2;
            const root  = new Node(array[mid]);

            root.left = build(array, start, mid - 1);
            root.right = build(array, mid + 1, end);

            return root;
        }
    }

    insert(value, root=this.root) {
        if (root === null) {
            throw new Error("Tree is empty");
        }
        if(root.value > value) {
            if(root.left === null) {
                root.left = new Node(value);
                return;
            }
            else {
                this.insert(value, root.right);
            }
        }
        else if (root.value === value) {
            return;
        }
        else {
            if (root.right === null) {
                root.right = new Node(value);
                return;
            }
            else {
                this.insert(value, root.left);
            }
        }
    }

    delete(value, root = this.root) {
        if (root === null) {
            throw new Error("Tree is empty");
        }
        if (root.value === value) {
            if (root.left === null && root.right === null) {
                root = null;
                return;
            }
            else if (root.left === null && root.right !== null) {
                root = root.right;
                return;
            }
            else if (root.left !== null && root.right === null) {
                root = root.left;
                return;
            }
            else if (root.left !== null && root.right !== null) {
                root = root.right.left;
                return;
            }
        }
        else if (root.value > value) {
            this.delete(value, root.left);
        }
        else if (root.value < value) {
            this.delete(value, root.right);
        }
    }

    find(value, root=this.root) {
        if (root === null) {
            return null;
        }
        if (root.value === value) {
            return root;
        }
        else if (root.value > value) {
            this.find(value, root.left);
        }
        else if (root.value < value) {
            this.find(value, root.right);
        }
    }

    levelOrderForEach(callback) {
        if (callback === undefined) {
            throw new Error("A callback function is required");
        }
        else {
            queue = [];
            queue.push(this.root);
            run(callback, queue);
        }
        
        function run(callback, queue) {
            if(queue.length === 0) {
                return;
            }
            const node = queue.shift();
            callback(node.value);
            if (node.left !== null) {
                queue.push(node.left);
            }
            if (node.right !== null) {
                queue.push(node.right);
            }
            run(callback, queue);
        }
    }

    preOrderForEach(callback) {
        if (callback === undefined) {
            throw new Error("A callback function is required");
        }
        else {
            preOrder(callback, this.root);
        }

        function preOrder(callback, root) {
            if (root === null) return;
            callback(root.value);
            preOrder(callback, root.left);
            preOrder(callback, root.right);
        }
    }

    inOrderForEach(callback) {
        if (callback === undefined) {
            throw new Error("A callback function is required");
        }
        else {
            inOrder(callback, this.root);
        }

        function inOrder(callback, root) {
            if (root === null) return;
            inOrder(root.left);
            callback(root.value);
            inOrder(root.right);
        }
    }

    postOrderForEach(callback) {
        if (callback === undefined) {
            throw new Error("A callback function is required");
        }
        else {
            postOrder(callback, this.root);
        }


        function postOrder(callback, root) {
            if (root === null) return;
            postOrder(root.left);
            postOrder(root.right);
            callback(root.value);
        }
    }

    height(value) {
        const root = this.find(value);
        if (root === null) {
            return null;
        }
        else {
            return calcHeight(root);
        }
        function calcHeight(root) {
            if (root === null) {
                return -1;
            }
            const leftHeight = this.height(root.left);
            const rightHeight = this.height(root.right);

            return Math.max(leftHeight, rightHeight) + 1;
        }

    }

    depth(value) {
        const node = this.find(value);
        if (node === null) {
            return null;
        }
        else {
            calcDepth(this.root, node);
        }

        function calcDepth(rootNode, node, level=0) {
            if (node === rootNode) {
                return level;
            }
            level++;
            calcDepth(rootNode.left, node, level);
            calcDepth(rootNode.right, node, level);
        }
    }

    isBalanced(root = this.root, balance=null) {
        if (root === null) {
            if (balance === null) {
                throw new Error("Tree is empty");
            }
            else {
                return balance;
            }
        }
        const heightDiff = calcHeight(root.left) - calcHeight(root.right);
        if (heightDiff > 1 && (root.left.value < root.right.value)) {
            balance = true;
            this.isBalanced(root.left, balance);
            this.isBalanced(root.right, balance);
        }
        else {
            balance = false;
        }


        function calcHeight(root) {
            if (root === null) {
                return -1;
            }
            const leftHeight = this.height(root.left);
            const rightHeight = this.height(root.right);

            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    rebalance() {
        const array = [];
        
        this.inOrderForEach(() => {
            array.push();
        })
        this.buildTree(array);
    }
} 





const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};