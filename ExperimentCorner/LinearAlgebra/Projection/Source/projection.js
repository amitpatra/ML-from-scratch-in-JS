
/**
 * 
 * @param {object} A A is a subspace.
 * @param {object} b b is a vector.
 * @summary this function project vector 'b' onto a subspace 'A'.
 * @returns returns the projected vector of 'b'.
 */
function project(A,b){
    // (A^TA)^-1 * (A^T*b);
    const part1 = tf.matMul(A.transpose(),A);

    const invP1 =  tfpinv(part1);
    const fac = invP1.matMul( tf.matMul(A.transpose(), b) );

    fac.print();
    return A.matMul(fac);
}


function ndProject(A,b){

    let projected = project(A.slice([0,0],[-1,1]), b);
    for(let i=1;i<A.shape[1];i++){
        const cColVec = A.slice([0,i],[-1,1]);
        projected = projected.concat(project(cColVec,b), axis=1);
    }

    return projected;
}