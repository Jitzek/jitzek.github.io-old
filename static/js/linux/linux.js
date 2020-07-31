const STARTUP_CONTAINER = "initial-console";
const GREEN = "#01FF00";
const STARTUP_WHITESPACE = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";

async function twInit() {
  let ok =`<span style="color: ${GREEN}">[ OK ]</span>`;

  let tw = initializeTW(STARTUP_CONTAINER, "tw");
  await tw.write("Uncompressing Linux.... ", 'span', 20);
  await sleep(1500);
  await tw.write("done, ", 'span', 50); 
  await sleep(300);
  await tw.write("booting the kernel.", 'span', 20);
  await sleep(500);
  tw.container.innerHTML += "<br>";

  for (let i = 0; i < startupSeq.length; i++) {
    tw.container.innerHTML += '<br>';
    if (startupSeq[i].ok) tw.container.innerHTML += ok;
    await tw.write(startupSeq[i].line, 'span', 1);
    tw.container.lastChild.scrollIntoView();
  }

  await sleep(700);
  tw.container.innerHTML += '<br><br>';
  await tw.write("Welcome to jitxekOS 0.1 (devPhase) (x86_64)!", 'p', 20, null, 'color: #CF7496;');
  tw.container.lastChild.scrollIntoView();
  await sleep(1000);
  tw.container.innerHTML += '<br>';
  await tw.write("Preparing Terminal... please wait.", 'p', 50);
  tw.container.lastChild.scrollIntoView();
  await sleep(1500);

  // Load Console
  tw.delete();
  document.getElementById('console').style.opacity = '1';
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const startupSeq = [
  {line: " Started Network Time Synchronization.", ok: true},
  {line: " Reached target System Time Synchronized.", ok: true},
  {line: " Started udev Kernel Device Manager.", ok: true},
  {line: " Started udev Kernel Device Manager.", ok: true},
  {line: " Reached target Paths.", ok: true},
  {line: " Reached target Local Encrypted Volumes.", ok: true},
  {line: " Found device JTZK00444AS.", ok: true},
  {line: STARTUP_WHITESPACE + " Activating swap /dev/disk/by-uuid/717z33k-e6a1-4ba0-9ea4-4f9d87c98703.", ok: false},
  {line: " Activated swap /dev/disk/by-uuid/717z33k-e6a1-4ba0-9ea4-4f9d87c98703.", ok: true},
  {line: " Found device 82540JK Gigabit Ethernet Controller (Truetek PRO 555).", ok: true},
  {line: " Reached target Swap.", ok: true},
  {line: " Started ifup for enp0s3.", ok: true},
  {line: " Reached target System Initialization.", ok: true},
  {line: " Started Daily man-db regeneration.", ok: true},
  {line: " Listening on D-Bus System Message Bus Socket.", ok: true},
  {line: " Reached target Sockets.", ok: true},
  {line: " Reached target Basic System.", ok: true},
  {line: STARTUP_WHITESPACE + " Starting Disk Manager...", ok: false},
  {line: " Started D-Bus System Message Bus.", ok: true},
  {line: STARTUP_WHITESPACE + " Starting WPA supplicant...", ok: false},
  {line: STARTUP_WHITESPACE + " Starting Login Service...", ok: false},
  {line: STARTUP_WHITESPACE + " Starting System Logging Service...", ok: false},
  {line: " Started System Logging Service.", ok: true},
  {line: " Started WPA supplicant.", ok: true},
  {line: " Reached target Network.", ok: true},
  {line: STARTUP_WHITESPACE + " Starting OpenBSD Secure Shell server...", ok: false},
  {line: STARTUP_WHITESPACE + " Starting Permit User Sessions...", ok: false},
  {line: " Reached target Sound Card.", ok: true},
  {line: " Started Permit User Sessions.", ok: true},
  {line: STARTUP_WHITESPACE + " Starting Hold until boot process finishes up...", ok: false},
  {line: " Started Login Service.", ok: true},
  {line: STARTUP_WHITESPACE + " Starting Authorization Manager...", ok: false},
  {line: " Started OpenBSD Secure Shell server.", ok: true},
  {line: " Started Authorization Manager.", ok: true},
  {line: " Started Disk Manager.", ok: true},
  {line: " Reached target Local Encrypted Volumes.", ok: true},
  {line: " Reached target Paths.", ok: true},
]