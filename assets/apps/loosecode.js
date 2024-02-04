var DoNotModifyUnlessYouKnowWhatYoureDoing = ["whatever"];
async function forceoffdata() {
    await writevar('forcedata', 'off');
}
async function forceondata() {
    await writevar('forcedata', 'on');
}
async function yescrd() {
    await writevar('crd', 'y');
}

async function nocrd() {
    await writevar('crd', 'n');
}

async function yeserrd() {
    await writevar('errd', 'y');
}

async function noerrd() {
    await writevar('errd', 'n');
}