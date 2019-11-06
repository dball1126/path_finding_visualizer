// add cost from node similar to dykstra
// search all nodes around the main one possibly the 8 not just the 4 (u, l, r , d)
// as you move from the node add the cost from the main node + the next + next etc.. 
// create the open list   squares that need to be checked out and must be looked at.
// create the closed list    squares that have been already checked out and we dont have to look at
// 1. put A on the list
// 2. you start with A as the parent and add the reachable nodes around it to the open list and add the parent square to the children.
// 3. drop the A from the open list and add it to the closed list 
// 4. next we choose one square from the open list and repeat the process above, but which one do we choose ?
//  We must use the equation F = G + H  to figure out which  node to choose.
//  G = the cost from moving from the node A to the current node we are on.
//  