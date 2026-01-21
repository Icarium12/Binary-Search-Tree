class Node {
    constructor(value = null, left=null, right=null) {
        this.value = value,
        this.left = left,
        this.right = right
    }
}

class Tree {
    constructor(array) {
        this.array = array;
        this.root;
    }

    buildTree(array = this.array) {
        if (array.length === 0) {
            throw new Error("Array is empty");
        }
        else {
            const uniqueArray = [...new Set(array)];
            uniqueArray.sort((a, b) => a - b);
            console.log(uniqueArray);
            const start = 0;
            const end = uniqueArray.length - 1;

            this.root = build(uniqueArray, start, end);
            return this.root;
        }


        function build(array, start, end) {
            if (start > end) {
                return null;
            }
            const mid = Math.round((start + end)/2);
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
                this.insert(value, root.left);
            }
        }
        else if (root.value === value) {
            return;
        }
        else if (root.value < value) {
            if (root.right === null) {
                root.right = new Node(value);
                return;
            }
            else {
                this.insert(value, root.right);
            }
        }
    }

    delete(value, root = this.root) {
        if (root === null) {
            return;
        }
        if (root.value === value) {
            if (root.left === null && root.right === null) {
                root = null;
                return
            }
            else if (root.left === null && root.right !== null) {
                root.value = root.right.value;
                root.right = null;
                return;
            }
            else if (root.left !== null && root.right === null) {
                root.value = root.left.value
                root.left = null;
                return;
            }
            else if (root.left !== null && root.right !== null) {
                if (root.right.left !== null) {
                    leftNull(root.right.left, root, root.right); 
                    // root.value = rightR.value
                    // rightR = null;
                    
                }
                else {
                    root.value = root.right.value;
                    root.right = null;
                    return;
                }
                function leftNull(root, headRoot, parentNode) {
                    if (root.left === null){
                        headRoot.value = root.value;
                        parentNode.left = null;
                        return root;
                    }
                    parentNode = root;
                    return leftNull(root.left, headRoot, parentNode)
                }
            }
        }
        else if (root.value > value) {
            return this.delete(value, root.left);
        }
        else if (root.value < value) {
            return this.delete(value, root.right);
        }




        // if (this.root.value === value) {
        //     this.root = root.left;
        //     return;
        // }
        // if (root === null) {
        //     throw new Error("Tree is empty");
        // }
        // if (root.value === value) {
        //     if (root.left === null && root.right === null) {
        //         if (previousRoot.left === root) {
        //             previousRoot.left = null;
        //             return;
        //         }
        //         else {
        //             previousRoot.right = null;
        //             return;
        //         }
                
        //     }
        //     else if (root.left === null && root.right !== null) {
        //         if (previousRoot.left === root) {
        //             previousRoot.left = root.right
        //             return
        //         }
        //         else {
        //             previousRoot.right = root.right;
        //             return;
        //         }
        //     }
        //     else if (root.left !== null && root.right === null) {
        //         if (previousRoot.left === root) {
        //             previousRoot.left = root.left
        //             return;
        //         }
        //         else {
        //             previousRoot.right = root.left;
        //             return;
        //         }
                
        //     }
        //     else if (root.left !== null && root.right !== null) {
        //         console.log(previousRoot);
        //         console.log("**************")
        //         console.log(root);
        //         // if (previousRoot === null) {
        //         //     root = null;
        //         //     return
        //         // }
        //         if (previousRoot.left === root) {
        //             if (root.right.left === null) {
        //                 const left = root.left;
        //                 root.right.left = left
        //                 previousRoot.left = root.right;
        //                 return;
        //             }
        //             else {
        //                 previousRoot.value = root.left.value;
        //                 const left = root.left;
        //                 root.right.left.left = left
        //                 previousRoot.left = root.right.left;
        //                 return;
        //             }
        //         }
        //         else if(previousRoot.right === root) {
        //             if (root.right.left === null) {
        //                 const left = root.left;
        //                 root.right.left = left
        //                 previousRoot.right = root.right
        //                 return;
        //             }
        //             else {
        //                 const left =root.left;
        //                 root.right.left.left = left
        //                 previousRoot.right = root.right.left;
        //                 return;
        //             }
        //         }   
        //     }
        // }
        // else if (root.value > value) {
        //     previousRoot = root
        //     return this.delete(value, root.left, previousRoot);
        // }
        // else if (root.value < value) {
        //     previousRoot = root
        //     return this.delete(value, root.right, previousRoot);
        // }
    }

    find(value, root=this.root) {
        if (root === null) {
            return null;
        }
        if (root.value === value) {
            return root;
        }
        else if (root.value > value) {
            return this.find(value, root.left);
        }
        else if (root.value < value) {
            return this.find(value, root.right);
        }
    }

    levelOrderForEach(callback) {
        if (callback === undefined) {
            throw new Error("A callback function is required");
        }
        else {
            const queue = [];
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
            inOrder(callback, root.left);
            callback(root.value);
            inOrder(callback, root.right);
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
            postOrder(callback, root.left);
            postOrder(callback, root.right);
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
            const leftHeight = calcHeight(root.left);
            const rightHeight = calcHeight(root.right);

            return Math.max(leftHeight, rightHeight) + 1;
        }

    }

    depth(value) {
        const node = this.find(value);
        if (node === null) {
            return null;
        }
        else {
            return calcDepth(this.root, node);
        }

        function calcDepth(rootNode, node, level=0) {
            if (node === rootNode) {
                return level;
            }
            level++
            if (rootNode.value > node.value) {
                return calcDepth(rootNode.left, node, level);
            }
            else {
                return calcDepth(rootNode.right, node, level);
            }
        }
    }

    isBalanced(root = this.root, balance=null) {
        if (root === null) {
            if (balance === null) {
                throw new Error("Tree is empty");
            }
            else {
                console.log(balance);
                return balance;
            }
        }
        const heightDiff = calcHeight(root.left) - calcHeight(root.right);
        console.log(heightDiff);
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
            const leftHeight = calcHeight(root.left);
            const rightHeight = calcHeight(root.right);

            return Math.max(leftHeight, rightHeight) + 1;
        }
    }

    rebalance() {
        const array = [];
        
        this.inOrderForEach((item) => {
            array.push(item);
        })
        this.buildTree(array);
    }
} 





export {Tree}