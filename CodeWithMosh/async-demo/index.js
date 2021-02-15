console.log('Before');

// Promise approach
// getUser(1)
//     .then(user => getRepositories(user.name))
//     .then((repos) => getCommit(repos[0]))
//     .catch(err => console.log('Error', err.message));

//Async and await approach
async function displayCommit(){
    try {
        const user = await getUser(1);
    const repos = await getRepositories(user.name);
    const commit = await getCommit(repos[0]);
    console.log(commit);
    } catch (error) {
        console.log('Error', error.message);
    }
}
displayCommit();

console.log('After');


// Callbacks
function getCommit(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Get Commit...`);
            resolve('Nice!');
        }, 3000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Calling Github API...`);
            resolve(['repository 1', 'repository 2', 'repository 3']);
        }, 3000)
    });
}

function getUser(id){
    return new Promise((resolve, reject) => {
        // Kick off some async work
        setTimeout(() => {
            console.log('Reading a user from database...');
            reject(new Error('Something failed!'));
            // resolve({id, name: "Otto"});
        }, 2000);
    });
}



