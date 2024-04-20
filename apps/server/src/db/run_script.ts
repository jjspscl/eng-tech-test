

const run_script = async () => {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        console.log("Please provide a script name");
        process.exit(1);
    }

    const scriptName = args[0];
    try {
        require.resolve(`./scripts/${scriptName}`);
    } catch (e) {
        console.log(`Script ${scriptName} not found`);
        process.exit(1);
    }


    const script = require(`./scripts/${scriptName}`);
    await script.default();

    console.log(`Script ${scriptName} ran successfully`);
    process.exit(0);
}

run_script();