var DoNotModifyUnlessYouKnowWhatYoureDoing = ["whatever"];
async function forceoffdata() {
    await writevar('forcedata', 'off');
}
async function forceondata() {
    await writevar('forcedata', 'on');
}