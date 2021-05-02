export function submitAnalytics(value: unknown) {
    fetch('http://localhost:3001/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(value)
    }).then((json) => {
        console.log(json);
    }).catch((ex) => {
        console.log(ex)
    });
}
