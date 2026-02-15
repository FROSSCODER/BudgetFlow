const appShell = document.getElementById("appShell");
const loggedOutScreen = document.getElementById("loggedOutScreen");
const addProfileScreen = document.getElementById("addProfileScreen");
const loggedOutProfiles = document.getElementById("loggedOutProfiles");
const toggleOtherProfilesBtn = document.getElementById("toggleOtherProfilesBtn");

const lockOverlay = document.getElementById("lockOverlay");
const lockBackBtn = document.getElementById("lockBackBtn");
const lockTitle = document.getElementById("lockTitle");
const lockHint = document.getElementById("lockHint");
const lockForm = document.getElementById("lockForm");
const lockTouchPrompt = document.getElementById("lockTouchPrompt");
const showPasscodeBtn = document.getElementById("showPasscodeBtn");
const retryTouchIdBtn = document.getElementById("retryTouchIdBtn");
const pinPadPanel = document.getElementById("pinPadPanel");
const pinPadDots = document.getElementById("pinPadDots");
const pinKeys = Array.from(document.querySelectorAll(".pin-key"));
const pinBiometricBtn = document.getElementById("pinBiometricBtn");
const passcodeFields = document.getElementById("passcodeFields");
const lockPasscodeInput = document.getElementById("lockPasscodeInput");
const lockConfirmGroup = document.getElementById("lockConfirmGroup");
const lockConfirmInput = document.getElementById("lockConfirmInput");
const lockSubmitButton = document.getElementById("lockSubmitButton");
const lockMessage = document.getElementById("lockMessage");
const lockPadlock = document.getElementById("lockPadlock");

const statusSettingsBtn = document.getElementById("statusSettingsBtn");
const statusLockBtn = document.getElementById("statusLockBtn");
const statusTime = document.getElementById("statusTime");
const statusAccountBtn = document.getElementById("statusAccountBtn");
const statusAccountName = document.getElementById("statusAccountName");
const accountMenu = document.getElementById("accountMenu");
const activeAccountRow = document.getElementById("activeAccountRow");
const accountList = document.getElementById("accountList");
const activeAccountInitials = document.getElementById("activeAccountInitials");
const activeAccountName = document.getElementById("activeAccountName");
const addAccountBtn = document.getElementById("addAccountBtn");
const logoutBtn = document.getElementById("logoutBtn");

const plannerPanel = document.getElementById("plannerPanel");
const settingsPanel = document.getElementById("settingsPanel");
const plannerTiles = document.getElementById("plannerTiles");
const layoutEditBanner = document.getElementById("layoutEditBanner");

const incomeInput = document.getElementById("incomeInput");
const targetInput = document.getElementById("targetInput");
const remainingBudgetEl = document.getElementById("remainingBudget");
const progressTextEl = document.getElementById("progressText");
const cycleTextEl = document.getElementById("cycleText");

const expenseForm = document.getElementById("expenseForm");
const dateInput = document.getElementById("dateInput");
const descInput = document.getElementById("descInput");
const categoryInput = document.getElementById("categoryInput");
const amountInput = document.getElementById("amountInput");

const expenseList = document.getElementById("expenseList");
const categoryBars = document.getElementById("categoryBars");
const spillOverList = document.getElementById("spillOverList");
const spillOverTotal = document.getElementById("spillOverTotal");

const currencyInput = document.getElementById("currencyInput");
const themeInput = document.getElementById("themeInput");
const cycleDayInput = document.getElementById("cycleDayInput");
const compactInput = document.getElementById("compactInput");
const darkModeInput = document.getElementById("darkModeInput");
const iphoneModeInput = document.getElementById("iphoneModeInput");
const darkModeScheduleInput = document.getElementById("darkModeScheduleInput");
const darkModeStartInput = document.getElementById("darkModeStartInput");
const darkModeEndInput = document.getElementById("darkModeEndInput");
const toggleSummary = document.getElementById("toggleSummary");
const toggleAddExpense = document.getElementById("toggleAddExpense");
const toggleBreakdown = document.getElementById("toggleBreakdown");
const toggleExpenses = document.getElementById("toggleExpenses");
const profileNameInput = document.getElementById("profileNameInput");
const profileImageInput = document.getElementById("profileImageInput");
const clearProfileImageBtn = document.getElementById("clearProfileImageBtn");
const profilesManager = document.getElementById("profilesManager");
const openAddProfilePageBtn = document.getElementById("openAddProfilePageBtn");
const addProfilePageForm = document.getElementById("addProfilePageForm");
const cancelAddProfileBtn = document.getElementById("cancelAddProfileBtn");
const newProfileNameInput = document.getElementById("newProfileNameInput");
const newProfilePasscodeInput = document.getElementById("newProfilePasscodeInput");
const newProfileConfirmInput = document.getElementById("newProfileConfirmInput");
const newProfileTouchIdInput = document.getElementById("newProfileTouchIdInput");
const addProfileMessage = document.getElementById("addProfileMessage");
const profilePreviewAvatar = document.getElementById("profilePreviewAvatar");
const profilePreviewName = document.getElementById("profilePreviewName");
const resetButton = document.getElementById("resetButton");

const changePasscodeForm = document.getElementById("changePasscodeForm");
const currentPasscodeInput = document.getElementById("currentPasscodeInput");
const newPasscodeInput = document.getElementById("newPasscodeInput");
const confirmPasscodeInput = document.getElementById("confirmPasscodeInput");
const passcodeMessage = document.getElementById("passcodeMessage");
const enableTouchIdBtn = document.getElementById("enableTouchIdBtn");
const disableTouchIdBtn = document.getElementById("disableTouchIdBtn");
const touchIdStatus = document.getElementById("touchIdStatus");
const autoWipeInput = document.getElementById("autoWipeInput");
const panicShortcutInput = document.getElementById("panicShortcutInput");
const backupPassphraseInput = document.getElementById("backupPassphraseInput");
const exportBackupBtn = document.getElementById("exportBackupBtn");
const importBackupBtn = document.getElementById("importBackupBtn");
const importBackupFileInput = document.getElementById("importBackupFileInput");
const securityToolsMessage = document.getElementById("securityToolsMessage");

const moduleSummary = document.getElementById("moduleSummary");
const moduleAddExpense = document.getElementById("moduleAddExpense");
const moduleBreakdown = document.getElementById("moduleBreakdown");
const moduleExpenses = document.getElementById("moduleExpenses");
const moduleSpillOver = document.getElementById("moduleSpillOver");
const toggleLayoutEditBtn = document.getElementById("toggleLayoutEditBtn");
const settingsGroups = Array.from(document.querySelectorAll("#settingsPanel .settings-group"));
const securitySettingsGroup = document.getElementById("securitySettingsGroup");

const STORAGE_KEY = "budgetflow-state-v4";
const AUTO_LOGOUT_AFTER_HIDDEN_MS = 10 * 1000;
const PASSCODE_PBKDF2_ITERATIONS = 180000;
const AUTH_MAX_ATTEMPTS = 5;
const AUTH_LOCK_BASE_MS = 2 * 60 * 1000;
const AUTH_LOCK_MAX_MS = 30 * 60 * 1000;
const AUTO_WIPE_THRESHOLD = 10;
const BACKUP_KDF_ITERATIONS = 200000;
const DEFAULT_LAYOUT_ORDER = ["summary", "add-expense", "breakdown", "expenses", "spillover"];

const state = {
  settings: {
    currency: "NZD",
    colorScheme: "ocean",
    cycleDay: 1,
    compactMode: false,
    darkMode: false,
    iphoneMode: false,
    darkModeScheduled: false,
    darkModeStart: "21:00",
    darkModeEnd: "07:00",
    autoWipeEnabled: false,
    panicShortcutEnabled: false,
    layoutOrder: [...DEFAULT_LAYOUT_ORDER],
    modules: {
      summary: true,
      addExpense: true,
      breakdown: true,
      expenses: true,
    },
  },
  security: {
    accounts: [],
    activeAccountId: null,
  },
};

let lockMode = "unlock";
let isUnlockAnimating = false;
let hiddenAtMs = null;
let isTouchIdPrompting = false;
let showOtherProfilesOnLoggedOut = false;
let addProfileReturnMode = "app";
let pendingSwipeUnlockAccountId = null;
let logoutSwipeStartY = null;
let logoutSwipeStartX = null;
const DEFAULT_PIN_LENGTH = 6;
let pinPadStep = "unlock";
let pinPadValue = "";
let pendingSetupPin = "";
let lockContext = "app";
let isSwipeUnlockTransitioning = false;
let allowSecurityPanelOpen = false;
let isLayoutEditMode = false;

function createBudgetData(overrides = {}) {
  return {
    income: String(overrides.income ?? 4000),
    target: String(overrides.target ?? 800),
    expenses: Array.isArray(overrides.expenses) ? overrides.expenses : [],
  };
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?";
}

function makeAccount(name, passcode = "") {
  return {
    id: crypto.randomUUID(),
    name,
    passcode,
    passcodeHash: null,
    passcodeSalt: null,
    passcodeIterations: PASSCODE_PBKDF2_ITERATIONS,
    passcodeLength: passcode ? String(passcode).length : DEFAULT_PIN_LENGTH,
    authFailedCount: 0,
    authLockUntil: 0,
    touchIdEnabled: false,
    touchIdCredentialId: null,
    profileImage: null,
    budget: createBudgetData(),
  };
}

function normalizeAccount(account) {
  const budget = account.budget || {};
  const legacyPasscode = account.passcode || "";
  return {
    id: account.id || crypto.randomUUID(),
    name: account.name || "Account",
    passcode: legacyPasscode,
    passcodeHash: account.passcodeHash || null,
    passcodeSalt: account.passcodeSalt || null,
    passcodeIterations: Number(account.passcodeIterations) || PASSCODE_PBKDF2_ITERATIONS,
    passcodeLength: Math.min(8, Math.max(4, Number(account.passcodeLength) || legacyPasscode.length || DEFAULT_PIN_LENGTH)),
    authFailedCount: Math.max(0, Number(account.authFailedCount) || 0),
    authLockUntil: Math.max(0, Number(account.authLockUntil) || 0),
    touchIdEnabled: Boolean(account.touchIdEnabled),
    touchIdCredentialId: account.touchIdCredentialId || null,
    profileImage: account.profileImage || null,
    budget: createBudgetData({
      income: budget.income,
      target: budget.target,
      expenses: budget.expenses,
    }),
  };
}

function supportsTouchId() {
  return Boolean(window.PublicKeyCredential && navigator.credentials);
}

function getTouchIdContextError() {
  if (!supportsTouchId()) {
    return "Biometrics unavailable in this browser.";
  }
  const { protocol, hostname } = window.location;
  const isSupportedWebAuthnOrigin =
    protocol === "https:" ||
    (protocol === "http:" && (hostname === "localhost" || hostname === "127.0.0.1"));

  if (!window.isSecureContext || !isSupportedWebAuthnOrigin) {
    return "Biometrics requires https:// or localhost (not file://).";
  }
  return null;
}

function bytesToBase64Url(bytes) {
  const binary = String.fromCharCode(...bytes);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64 + "===".slice((base64.length + 3) % 4);
  const binary = atob(padded);
  return Uint8Array.from(binary, (c) => c.charCodeAt(0));
}

function randomBytes(size = 32) {
  const bytes = new Uint8Array(size);
  crypto.getRandomValues(bytes);
  return bytes;
}

function hasAccountPasscode(account) {
  return Boolean(account.passcodeHash || account.passcode);
}

function getAccountLockRemainingMs(account) {
  const remaining = Number(account.authLockUntil || 0) - Date.now();
  return remaining > 0 ? remaining : 0;
}

function formatLockDuration(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function resetAccountAuthState(account) {
  account.authFailedCount = 0;
  account.authLockUntil = 0;
}

function registerFailedAccountAttempt(account) {
  account.authFailedCount = Math.max(0, Number(account.authFailedCount) || 0) + 1;
  if (account.authFailedCount >= AUTH_MAX_ATTEMPTS) {
    const penaltyStep = account.authFailedCount - AUTH_MAX_ATTEMPTS;
    const lockMs = Math.min(AUTH_LOCK_MAX_MS, AUTH_LOCK_BASE_MS * Math.pow(2, penaltyStep));
    account.authLockUntil = Date.now() + lockMs;
  }
}

function wipeAllLocalData() {
  localStorage.removeItem(STORAGE_KEY);
  window.alert("Security wipe triggered. App data has been cleared.");
  window.location.reload();
}

async function derivePasscodeHash(passcode, saltBase64Url, iterations = PASSCODE_PBKDF2_ITERATIONS) {
  const saltBytes = base64UrlToBytes(saltBase64Url);
  const keyMaterial = await crypto.subtle.importKey("raw", new TextEncoder().encode(passcode), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );
  return bytesToBase64Url(new Uint8Array(bits));
}

async function setAccountPasscode(account, passcode) {
  const normalized = String(passcode || "").trim();
  const salt = bytesToBase64Url(randomBytes(16));
  const hash = await derivePasscodeHash(normalized, salt, PASSCODE_PBKDF2_ITERATIONS);
  account.passcodeHash = hash;
  account.passcodeSalt = salt;
  account.passcodeIterations = PASSCODE_PBKDF2_ITERATIONS;
  account.passcodeLength = normalized.length || DEFAULT_PIN_LENGTH;
  account.passcode = "";
  resetAccountAuthState(account);
}

async function verifyAccountPasscode(account, passcode) {
  const lockRemaining = getAccountLockRemainingMs(account);
  if (lockRemaining > 0) {
    return { ok: false, message: `Too many attempts. Try again in ${formatLockDuration(lockRemaining)}.` };
  }

  const normalized = String(passcode || "").trim();
  let isValid = false;
  if (account.passcodeHash && account.passcodeSalt) {
    const hash = await derivePasscodeHash(normalized, account.passcodeSalt, account.passcodeIterations);
    isValid = hash === account.passcodeHash;
  } else {
    isValid = normalized === String(account.passcode || "").trim();
    if (isValid) {
      await setAccountPasscode(account, normalized);
    }
  }

  if (isValid) {
    resetAccountAuthState(account);
    return { ok: true, message: "" };
  }

  registerFailedAccountAttempt(account);
  if (state.settings.autoWipeEnabled && account.authFailedCount >= AUTO_WIPE_THRESHOLD) {
    wipeAllLocalData();
    return { ok: false, message: "Security wipe triggered." };
  }
  const remaining = getAccountLockRemainingMs(account);
  if (remaining > 0) {
    return { ok: false, message: `Too many attempts. Try again in ${formatLockDuration(remaining)}.` };
  }
  return { ok: false, message: "Incorrect PIN." };
}

async function deriveBackupKey(passphrase, saltBytes) {
  const baseKey = await crypto.subtle.importKey("raw", new TextEncoder().encode(passphrase), "PBKDF2", false, [
    "deriveKey",
  ]);
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: BACKUP_KDF_ITERATIONS,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Could not read backup file."));
    reader.readAsText(file);
  });
}

function getPersistedState() {
  const budget = getActiveBudgetData();
  return {
    income: budget.income,
    target: budget.target,
    expenses: budget.expenses,
    settings: state.settings,
    security: state.security,
  };
}

async function createEncryptedBackup(passphrase) {
  const payloadText = JSON.stringify(getPersistedState());
  const salt = randomBytes(16);
  const iv = randomBytes(12);
  const key = await deriveBackupKey(passphrase, salt);
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(payloadText)
  );
  return {
    type: "budgetflow-backup-v1",
    kdf: "PBKDF2-SHA256",
    iterations: BACKUP_KDF_ITERATIONS,
    salt: bytesToBase64Url(salt),
    iv: bytesToBase64Url(iv),
    data: bytesToBase64Url(new Uint8Array(encrypted)),
    createdAt: new Date().toISOString(),
  };
}

async function decryptBackupObject(passphrase, backupObject) {
  if (!backupObject || backupObject.type !== "budgetflow-backup-v1") {
    throw new Error("Invalid backup file.");
  }
  const salt = base64UrlToBytes(String(backupObject.salt || ""));
  const iv = base64UrlToBytes(String(backupObject.iv || ""));
  const data = base64UrlToBytes(String(backupObject.data || ""));
  const key = await deriveBackupKey(passphrase, salt);
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
  const text = new TextDecoder().decode(plain);
  return JSON.parse(text);
}

function touchIdStatusText(account) {
  const contextError = getTouchIdContextError();
  if (contextError) {
    return contextError;
  }
  return account.touchIdEnabled ? "Biometrics enabled for this account." : "Biometrics not enabled.";
}

function getActiveAccount() {
  return state.security.accounts.find((account) => account.id === state.security.activeAccountId) || null;
}

function ensureActiveAccount() {
  const existing = getActiveAccount();
  if (existing) return existing;

  if (state.security.accounts.length) {
    state.security.activeAccountId = state.security.accounts[0].id;
    return state.security.accounts[0];
  }

  const account = makeAccount("Finn Ross", "");
  state.security.accounts.push(account);
  state.security.activeAccountId = account.id;
  return account;
}

function setActiveAccount(accountId) {
  state.security.activeAccountId = accountId;
  syncBudgetInputsFromActive();
  updateAccountUI();
  refresh();
}

function getActiveBudgetData() {
  const active = ensureActiveAccount();
  active.budget = createBudgetData(active.budget);
  return active.budget;
}

function syncBudgetInputsFromActive() {
  const budget = getActiveBudgetData();
  incomeInput.value = budget.income;
  targetInput.value = budget.target;
}

function persistBudgetInputsToActive() {
  const budget = getActiveBudgetData();
  budget.income = String(incomeInput.value || 0);
  budget.target = String(targetInput.value || 0);
}

function updateAccountUI() {
  const account = ensureActiveAccount();
  syncBudgetInputsFromActive();
  const initials = getInitials(account.name);
  const avatarEls = [activeAccountInitials, profilePreviewAvatar];

  for (const el of avatarEls) {
    el.textContent = initials;
    if (account.profileImage) {
      el.classList.add("has-image");
      el.style.backgroundImage = `url('${account.profileImage}')`;
    } else {
      el.classList.remove("has-image");
      el.style.backgroundImage = "";
    }
  }

  statusAccountName.textContent = account.name;
  activeAccountName.textContent = account.name;
  profilePreviewName.textContent = account.name;
  profileNameInput.value = account.name;
  profileImageInput.value = "";
  touchIdStatus.textContent = touchIdStatusText(account);
  renderAccountList();
  renderLoggedOutProfiles();
  renderProfilesManager();
}

function renderLoggedOutProfiles() {
  loggedOutProfiles.innerHTML = "";
  const activeId = state.security.activeAccountId;
  const active = state.security.accounts.find((account) => account.id === activeId) || state.security.accounts[0];
  const others = state.security.accounts.filter((account) => account.id !== active?.id);
  const visibleAccounts = showOtherProfilesOnLoggedOut ? [active, ...others].filter(Boolean) : [active].filter(Boolean);

  visibleAccounts.forEach((account) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "logged-out-profile-btn";
    if (account.id === state.security.activeAccountId) {
      button.classList.add("is-active");
    }
    button.dataset.accountId = account.id;
    button.title = account.name;
    button.setAttribute("aria-label", `Sign in as ${account.name}`);

    const avatar = document.createElement("span");
    avatar.className = "avatar-circle";
    avatar.textContent = getInitials(account.name);
    if (account.profileImage) {
      avatar.classList.add("has-image");
      avatar.style.backgroundImage = `url('${account.profileImage}')`;
    }

    button.appendChild(avatar);
    loggedOutProfiles.appendChild(button);
  });

  const hasOtherProfiles = others.length > 0;
  toggleOtherProfilesBtn.classList.toggle("hidden-module", !hasOtherProfiles);
  if (hasOtherProfiles) {
    toggleOtherProfilesBtn.textContent = showOtherProfilesOnLoggedOut ? "Hide Other Profiles" : "Show Other Profiles";
  }
}

function shouldUseSwipeUnlock() {
  return Boolean(state.settings.iphoneMode);
}

function resetLogoutSwipeGate() {
  pendingSwipeUnlockAccountId = null;
  logoutSwipeStartY = null;
  logoutSwipeStartX = null;
  isSwipeUnlockTransitioning = false;
  loggedOutScreen.classList.remove("swipe-ready");
  loggedOutScreen.classList.remove("swipe-transitioning");
  lockOverlay.classList.remove("swipe-enter");
}

function armLogoutSwipeGate(accountId) {
  pendingSwipeUnlockAccountId = accountId;
  loggedOutScreen.classList.add("swipe-ready");
}

function completeLogoutSwipeGate() {
  if (!pendingSwipeUnlockAccountId || !shouldUseSwipeUnlock() || isSwipeUnlockTransitioning) return;
  isSwipeUnlockTransitioning = true;
  loggedOutScreen.classList.add("swipe-transitioning");
  setTimeout(() => {
    openLockOverlay("app");
    lockOverlay.classList.add("swipe-enter");
    setTimeout(() => {
      lockOverlay.classList.remove("swipe-enter");
    }, 380);
  }, 180);
}

function renderAccountList() {
  accountList.innerHTML = "";
  const activeId = state.security.activeAccountId;

  state.security.accounts
    .filter((account) => account.id !== activeId)
    .forEach((account) => {
      const row = document.createElement("button");
      row.type = "button";
      row.className = "account-row small";

      const avatar = document.createElement("span");
      avatar.className = "avatar-circle";
      avatar.textContent = getInitials(account.name);
      if (account.profileImage) {
        avatar.classList.add("has-image");
        avatar.style.backgroundImage = `url('${account.profileImage}')`;
      }

      const name = document.createElement("span");
      name.textContent = account.name;

      row.append(avatar, name);
      row.addEventListener("click", () => {
        setActiveAccount(account.id);
        showAccountMenu(false);
        showLoggedOutScreen();
      });

      accountList.appendChild(row);
    });
}

function removeProfile(accountId) {
  if (state.security.accounts.length <= 1) {
    window.alert("You must keep at least one profile.");
    return;
  }

  const account = state.security.accounts.find((entry) => entry.id === accountId);
  if (!account) return;
  const confirmed = window.confirm(`Remove profile "${account.name}"?`);
  if (!confirmed) return;

  const removingActive = state.security.activeAccountId === accountId;
  state.security.accounts = state.security.accounts.filter((entry) => entry.id !== accountId);

  if (removingActive) {
    const nextAccountId = state.security.accounts[0]?.id || null;
    if (nextAccountId) {
      setActiveAccount(nextAccountId);
    }
    showAccountMenu(false);
    showLoggedOutScreen();
    return;
  }

  updateAccountUI();
  saveState();
}

function renderProfilesManager() {
  profilesManager.innerHTML = "";
  const activeId = state.security.activeAccountId;

  state.security.accounts.forEach((account) => {
    const row = document.createElement("div");
    row.className = "profile-manage-row";

    const main = document.createElement("div");
    main.className = "profile-manage-main";

    const avatar = document.createElement("span");
    avatar.className = "avatar-circle";
    avatar.textContent = getInitials(account.name);
    if (account.profileImage) {
      avatar.classList.add("has-image");
      avatar.style.backgroundImage = `url('${account.profileImage}')`;
    }

    const name = document.createElement("span");
    name.className = "profile-manage-name";
    if (account.id === activeId) {
      name.classList.add("active");
      name.textContent = `${account.name} (Current)`;
    } else {
      name.textContent = account.name;
    }

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "profile-remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.disabled = state.security.accounts.length <= 1;
    removeBtn.addEventListener("click", () => removeProfile(account.id));

    main.append(avatar, name);
    row.append(main, removeBtn);
    profilesManager.appendChild(row);
  });
}

function formatMoney(value) {
  const locale = state.settings.currency === "NZD" ? "en-NZ" : "en-US";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: state.settings.currency,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function getBudgetCycleRange() {
  const now = new Date();
  const cycleDay = Math.min(28, Math.max(1, Number(state.settings.cycleDay) || 1));

  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), cycleDay);
  const start =
    now.getDate() >= cycleDay
      ? currentMonthStart
      : new Date(now.getFullYear(), now.getMonth() - 1, cycleDay);
  const end = new Date(start.getFullYear(), start.getMonth() + 1, cycleDay);

  return { start, end };
}

function inCycle(dateString, start, end) {
  const date = new Date(`${dateString}T00:00:00`);
  return date >= start && date < end;
}

function getMonthlyStats() {
  const budget = getActiveBudgetData();
  const income = Number(budget.income) || 0;
  const target = Number(budget.target) || 0;
  const { start, end } = getBudgetCycleRange();

  const cycleExpenses = budget.expenses.filter((item) => inCycle(item.date, start, end));
  const spent = cycleExpenses.reduce((sum, item) => sum + item.amount, 0);
  const remaining = income - target - spent;
  const categories = {};

  for (const item of cycleExpenses) {
    categories[item.category] = (categories[item.category] || 0) + item.amount;
  }

  const sortedCategories = Object.entries(categories)
    .sort((a, b) => b[1] - a[1])
    .map(([name, amount]) => ({ name, amount }));

  return { income, target, spent, remaining, categories: sortedCategories, start, end };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(getPersistedState()));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    dateInput.valueAsDate = new Date();
    ensureActiveAccount();
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    const legacyIncome = parsed.income;
    const legacyTarget = parsed.target;
    const legacyExpenses = Array.isArray(parsed.expenses) ? parsed.expenses : [];

    if (parsed.settings) {
      state.settings.currency = parsed.settings.currency || "NZD";
      state.settings.colorScheme = parsed.settings.colorScheme || "ocean";
      state.settings.cycleDay = Number(parsed.settings.cycleDay) || 1;
      state.settings.compactMode = Boolean(parsed.settings.compactMode);
      state.settings.darkMode = Boolean(parsed.settings.darkMode);
      state.settings.iphoneMode = Boolean(parsed.settings.iphoneMode);
      state.settings.darkModeScheduled = Boolean(parsed.settings.darkModeScheduled);
      state.settings.darkModeStart = parsed.settings.darkModeStart || "21:00";
      state.settings.darkModeEnd = parsed.settings.darkModeEnd || "07:00";
      state.settings.autoWipeEnabled = Boolean(parsed.settings.autoWipeEnabled);
      state.settings.panicShortcutEnabled = Boolean(parsed.settings.panicShortcutEnabled);
      const layoutOrder = Array.isArray(parsed.settings.layoutOrder)
        ? parsed.settings.layoutOrder.filter((value) => typeof value === "string")
        : [];
      state.settings.layoutOrder = layoutOrder.length ? layoutOrder : [...DEFAULT_LAYOUT_ORDER];

      const modules = parsed.settings.modules || {};
      state.settings.modules = {
        summary: modules.summary !== false,
        addExpense: modules.addExpense !== false,
        breakdown: modules.breakdown !== false,
        expenses: modules.expenses !== false,
      };
    }

    if (parsed.security && Array.isArray(parsed.security.accounts)) {
      const accountsHaveBudget = parsed.security.accounts.some((account) => account && account.budget);
      state.security.accounts = parsed.security.accounts.map(normalizeAccount);
      state.security.activeAccountId = parsed.security.activeAccountId || null;
      if (!accountsHaveBudget && (legacyIncome || legacyTarget || legacyExpenses.length)) {
        const active = ensureActiveAccount();
        active.budget = createBudgetData({
          income: legacyIncome,
          target: legacyTarget,
          expenses: legacyExpenses,
        });
      }
    } else {
      const migratedName = parsed.settings?.activeAccount || parsed.settings?.displayName || "Finn Ross";
      const migratedPasscode = parsed.security?.passcode || "";
      const migrated = makeAccount(migratedName, migratedPasscode);
      migrated.budget = createBudgetData({
        income: legacyIncome,
        target: legacyTarget,
        expenses: legacyExpenses,
      });
      state.security.accounts = [migrated];
      state.security.activeAccountId = migrated.id;
    }
  } catch {
    state.security.accounts = [];
    state.security.activeAccountId = null;
  }

  ensureActiveAccount();
  syncBudgetInputsFromActive();
  dateInput.valueAsDate = new Date();
}

function renderExpenses() {
  const budget = getActiveBudgetData();
  expenseList.innerHTML = "";

  if (!budget.expenses.length) {
    const empty = document.createElement("li");
    empty.className = "expense-item";
    empty.innerHTML = `<strong>No expenses yet.</strong><span class="expense-meta">Add one to start tracking.</span>`;
    expenseList.appendChild(empty);
    return;
  }

  budget.expenses
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .forEach((item) => {
      const li = document.createElement("li");
      li.className = "expense-item";

      const details = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = `${item.description} - ${formatMoney(item.amount)}`;
      const meta = document.createElement("p");
      meta.className = "expense-meta";
      meta.textContent = `${item.category} | ${item.date}`;
      details.append(title, meta);

      const del = document.createElement("button");
      del.className = "delete-btn";
      del.type = "button";
      del.textContent = "Delete";
      del.addEventListener("click", () => {
        budget.expenses = budget.expenses.filter((entry) => entry.id !== item.id);
        refresh();
      });

      li.append(details, del);
      expenseList.appendChild(li);
    });
}

function renderBars(stats) {
  categoryBars.innerHTML = "";

  if (!stats.categories.length) {
    categoryBars.innerHTML = '<p class="tiny-muted">No cycle spending data yet.</p>';
    return;
  }

  stats.categories.forEach((cat) => {
    const pct = stats.spent > 0 ? (cat.amount / stats.spent) * 100 : 0;

    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-label">
        <span>${cat.name}</span>
        <span>${formatMoney(cat.amount)} (${pct.toFixed(0)}%)</span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
    `;

    categoryBars.appendChild(row);
  });
}

function renderSummary() {
  const stats = getMonthlyStats();
  const remaining = stats.remaining;
  const remainingCard = remainingBudgetEl.closest(".stat-card");

  remainingBudgetEl.textContent = formatMoney(remaining);
  remainingBudgetEl.style.color = remaining < 0 ? "#d84b62" : "#0c7f67";
  if (remainingCard) {
    remainingCard.classList.toggle("debt-state", remaining < 0);
    remainingCard.classList.toggle("accent", remaining >= 0);
  }

  progressTextEl.textContent = `${formatMoney(stats.spent)} spent | ${formatMoney(
    stats.target
  )} savings target`;

  const startLabel = stats.start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endExclusive = new Date(stats.end.getTime() - 1);
  const endLabel = endExclusive.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  cycleTextEl.textContent = `Cycle: ${startLabel} - ${endLabel}`;
  renderBars(stats);
}

function renderSpillOver() {
  const budget = getActiveBudgetData();
  spillOverList.innerHTML = "";

  const income = Number(budget.income) || 0;
  const target = Number(budget.target) || 0;
  const { start, end } = getBudgetCycleRange();
  const spent = budget.expenses
    .filter((item) => inCycle(item.date, start, end))
    .reduce((sum, item) => sum + item.amount, 0);
  const leftover = income - target - spent;
  const endInclusive = new Date(end.getTime() - 1);
  const label = `Current Cycle (${start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })} - ${endInclusive.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })})`;

  const li = document.createElement("li");
  li.className = "spill-item";
  li.innerHTML = `
    <span class="expense-meta">${label}</span>
    <strong style="color:${leftover < 0 ? "#d84b62" : "#0c7f67"}">${formatMoney(leftover)}</strong>
  `;
  spillOverList.appendChild(li);

  spillOverTotal.textContent = `Total Spill Over: ${formatMoney(leftover)}`;
  spillOverTotal.style.color = leftover < 0 ? "#d84b62" : "#0c7f67";
}

function syncSettingsControls() {
  currencyInput.value = state.settings.currency;
  themeInput.value = state.settings.colorScheme;
  cycleDayInput.value = state.settings.cycleDay;
  compactInput.checked = state.settings.compactMode;
  darkModeInput.checked = state.settings.darkMode;
  iphoneModeInput.checked = state.settings.iphoneMode;
  darkModeScheduleInput.checked = state.settings.darkModeScheduled;
  darkModeStartInput.value = state.settings.darkModeStart;
  darkModeEndInput.value = state.settings.darkModeEnd;
  autoWipeInput.checked = state.settings.autoWipeEnabled;
  panicShortcutInput.checked = state.settings.panicShortcutEnabled;
  darkModeStartInput.disabled = !state.settings.darkModeScheduled;
  darkModeEndInput.disabled = !state.settings.darkModeScheduled;
  darkModeInput.disabled = state.settings.darkModeScheduled;

  toggleSummary.checked = state.settings.modules.summary;
  toggleAddExpense.checked = state.settings.modules.addExpense;
  toggleBreakdown.checked = state.settings.modules.breakdown;
  toggleExpenses.checked = state.settings.modules.expenses;

  syncBudgetInputsFromActive();
  updateAccountUI();
}

function applyModulesVisibility() {
  moduleSummary.classList.toggle("hidden-module", !state.settings.modules.summary);
  moduleAddExpense.classList.toggle("hidden-module", !state.settings.modules.addExpense);
  moduleBreakdown.classList.toggle("hidden-module", !state.settings.modules.breakdown);
  moduleExpenses.classList.toggle("hidden-module", !state.settings.modules.expenses);
  moduleSpillOver.classList.toggle("hidden-module", !state.settings.modules.expenses);
}

function getPlannerTileElements() {
  return Array.from(plannerTiles.querySelectorAll("[data-layout-id]"));
}

function normalizeLayoutOrder() {
  const tileIds = getPlannerTileElements().map((tile) => tile.dataset.layoutId);
  const seen = new Set();
  const normalized = [];

  for (const id of state.settings.layoutOrder || []) {
    if (!tileIds.includes(id) || seen.has(id)) continue;
    normalized.push(id);
    seen.add(id);
  }

  for (const id of tileIds) {
    if (seen.has(id)) continue;
    normalized.push(id);
    seen.add(id);
  }

  state.settings.layoutOrder = normalized;
}

function applyPlannerLayoutOrder() {
  normalizeLayoutOrder();
  const tilesById = new Map(getPlannerTileElements().map((tile) => [tile.dataset.layoutId, tile]));
  for (const id of state.settings.layoutOrder) {
    const tile = tilesById.get(id);
    if (!tile) continue;
    plannerTiles.appendChild(tile);
  }
  renderTileMoveControls();
}

function movePlannerTile(layoutId, delta) {
  normalizeLayoutOrder();
  const list = state.settings.layoutOrder;
  const index = list.indexOf(layoutId);
  if (index === -1) return;
  const nextIndex = index + delta;
  if (nextIndex < 0 || nextIndex >= list.length) return;
  [list[index], list[nextIndex]] = [list[nextIndex], list[index]];
  applyPlannerLayoutOrder();
  saveState();
}

function renderTileMoveControls() {
  const tiles = getPlannerTileElements();
  const order = state.settings.layoutOrder || [];

  tiles.forEach((tile) => {
    const existing = tile.querySelector(".tile-move-controls");
    if (existing) existing.remove();
    if (!isLayoutEditMode) return;

    const id = tile.dataset.layoutId;
    const index = order.indexOf(id);
    if (index === -1) return;

    const controls = document.createElement("div");
    controls.className = "tile-move-controls";

    const label = document.createElement("span");
    label.className = "tile-move-label";
    label.textContent = "Move:";

    const up = document.createElement("button");
    up.type = "button";
    up.className = "tile-move-btn";
    up.textContent = "Up";
    up.title = "Move up";
    up.disabled = index === 0;
    up.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      movePlannerTile(id, -1);
    });

    const down = document.createElement("button");
    down.type = "button";
    down.className = "tile-move-btn";
    down.textContent = "Down";
    down.title = "Move down";
    down.disabled = index === order.length - 1;
    down.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      movePlannerTile(id, 1);
    });

    controls.append(label, up, down);
    tile.prepend(controls);
  });
}

function setLayoutEditMode(enabled) {
  isLayoutEditMode = Boolean(enabled);
  document.body.classList.toggle("layout-edit-mode", isLayoutEditMode);
  layoutEditBanner?.classList.toggle("hidden-module", !isLayoutEditMode);
  if (toggleLayoutEditBtn) {
    toggleLayoutEditBtn.textContent = isLayoutEditMode ? "Done Moving Tiles" : "Customize Dashboard Layout";
  }
  renderTileMoveControls();
}

function updateMainScrollLock() {
  const isAppVisible = appShell.classList.contains("app-visible");
  const isPlannerActive = plannerPanel.classList.contains("active");
  if (!isAppVisible || !isPlannerActive) {
    document.body.classList.remove("main-scroll-locked");
    return;
  }

  const needsScroll = document.documentElement.scrollHeight > window.innerHeight + 2;
  document.body.classList.toggle("main-scroll-locked", !needsScroll);
}

function applyCompactMode() {
  document.body.classList.toggle("compact", state.settings.compactMode);
}

function applyIphoneMode() {
  document.body.classList.toggle("iphone-mode", state.settings.iphoneMode);
  if (!state.settings.iphoneMode) {
    resetLogoutSwipeGate();
  }
}

function applyDarkMode() {
  document.body.classList.toggle("dark-theme", isDarkModeActive());
}

function applyColorScheme() {
  document.body.classList.remove(
    "scheme-deepblue",
    "scheme-forest",
    "scheme-sunset",
    "scheme-rose",
    "scheme-mint",
    "scheme-slate",
    "scheme-gold",
    "scheme-berry"
  );
  if (state.settings.colorScheme === "deepblue") {
    document.body.classList.add("scheme-deepblue");
  } else if (state.settings.colorScheme === "forest") {
    document.body.classList.add("scheme-forest");
  } else if (state.settings.colorScheme === "sunset") {
    document.body.classList.add("scheme-sunset");
  } else if (state.settings.colorScheme === "rose") {
    document.body.classList.add("scheme-rose");
  } else if (state.settings.colorScheme === "mint") {
    document.body.classList.add("scheme-mint");
  } else if (state.settings.colorScheme === "slate") {
    document.body.classList.add("scheme-slate");
  } else if (state.settings.colorScheme === "gold") {
    document.body.classList.add("scheme-gold");
  } else if (state.settings.colorScheme === "berry") {
    document.body.classList.add("scheme-berry");
  }
}

function setActiveTab(tabName) {
  const planner = tabName === "planner";
  plannerPanel.classList.toggle("active", planner);
  settingsPanel.classList.toggle("active", !planner);
  if (!planner) {
    settingsGroups.forEach((group) => {
      group.open = false;
    });
  }
  statusSettingsBtn.classList.toggle("active", !planner);
  statusSettingsBtn.setAttribute("aria-label", planner ? "Open Settings" : "Back to Planner");
  requestAnimationFrame(updateMainScrollLock);
}

function updateStatusTime() {
  const now = new Date();
  statusTime.textContent = now.toLocaleTimeString("en-NZ", {
    hour: "numeric",
    minute: "2-digit",
  });
  applyDarkMode();
}

function timeStringToMinutes(timeString) {
  const match = /^(\d{2}):(\d{2})$/.exec(String(timeString || ""));
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
}

function isDarkModeActive() {
  if (!state.settings.darkModeScheduled) {
    return state.settings.darkMode;
  }

  const startMin = timeStringToMinutes(state.settings.darkModeStart);
  const endMin = timeStringToMinutes(state.settings.darkModeEnd);
  if (startMin === null || endMin === null) {
    return state.settings.darkMode;
  }

  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  if (startMin === endMin) return true;
  if (startMin < endMin) {
    return nowMin >= startMin && nowMin < endMin;
  }
  return nowMin >= startMin || nowMin < endMin;
}

function showAccountMenu(show) {
  accountMenu.classList.toggle("hidden-module", !show);
}

function openSecuritySettingsAfterGate() {
  allowSecurityPanelOpen = true;
  setActiveTab("settings");
  settingsGroups.forEach((group) => {
    group.open = group === securitySettingsGroup;
  });
  setTimeout(() => {
    allowSecurityPanelOpen = false;
  }, 0);
}

function initSettingsAccordion() {
  if (!settingsGroups.length) return;

  if (securitySettingsGroup) {
    securitySettingsGroup.addEventListener("toggle", () => {
      if (!securitySettingsGroup.open) return;
      if (allowSecurityPanelOpen) return;
      const active = ensureActiveAccount();
      if (!hasAccountPasscode(active)) return;
      securitySettingsGroup.open = false;
      if (lockOverlay.classList.contains("active-screen")) return;
      openLockOverlay("security");
    });
  }

  settingsGroups.forEach((group) => {
    group.addEventListener("toggle", () => {
      if (!group.open) return;
      settingsGroups.forEach((other) => {
        if (other !== group) {
          other.open = false;
        }
      });
    });
  });
}

function setScreen(mode) {
  const showLoggedOut = mode === "loggedOut";
  const showAddProfile = mode === "addProfile";
  const showLock = mode === "lock";
  const showApp = mode === "app";

  loggedOutScreen.classList.toggle("active-screen", showLoggedOut);
  addProfileScreen.classList.toggle("active-screen", showAddProfile);
  lockOverlay.classList.toggle("active-screen", showLock);
  appShell.classList.toggle("app-visible", showApp);
  appShell.classList.toggle("app-locked", !showApp);
  requestAnimationFrame(updateMainScrollLock);
}

function showLoggedOutScreen() {
  setLayoutEditMode(false);
  resetLogoutSwipeGate();
  showOtherProfilesOnLoggedOut = false;
  renderLoggedOutProfiles();
  addProfileMessage.textContent = "";
  setScreen("loggedOut");
  showAccountMenu(false);
}

function showAddProfileScreen(returnMode = "app") {
  addProfileReturnMode = returnMode;
  addProfileMessage.textContent = "";
  addProfilePageForm.reset();
  setScreen("addProfile");
  setTimeout(() => newProfileNameInput.focus(), 120);
}

function configureLockMode() {
  const active = ensureActiveAccount();
  lockMode = hasAccountPasscode(active) ? "unlock" : "setup";

  if (lockMode === "setup") {
    lockTitle.textContent = "Create Passcode";
    lockHint.textContent = `Set a passcode for ${active.name}.`;
    lockTouchPrompt.classList.add("hidden-module");
    showPasscodeBtn.classList.add("hidden-module");
    passcodeFields.classList.add("hidden-module");
    lockConfirmGroup.classList.remove("hidden-module");
    lockPasscodeInput.required = false;
    lockConfirmInput.required = false;
    lockSubmitButton.textContent = "Create Passcode";
  } else {
    lockTitle.textContent = "Unlock BudgetFlow";
    lockHint.textContent = `Unlock ${active.name}.`;
    lockTouchPrompt.classList.add("hidden-module");
    lockTouchPrompt.textContent = "";
    lockConfirmGroup.classList.add("hidden-module");
    lockConfirmInput.required = false;
    passcodeFields.classList.add("hidden-module");
    showPasscodeBtn.classList.add("hidden-module");
    lockPasscodeInput.required = false;
    lockSubmitButton.textContent = "Unlock";
  }

  showPasscodeBtn.textContent = lockMode === "setup" ? "Create PIN" : "Use PIN";
  retryTouchIdBtn.classList.add("hidden-module");
  pinPadPanel.classList.add("hidden-module");
  pinPadStep = lockMode === "setup" ? "setup-create" : "unlock";
  pinPadValue = "";
  pendingSetupPin = "";
  updatePinDots();

  lockMessage.textContent = "";
  lockPasscodeInput.value = "";
  lockConfirmInput.value = "";
  const lockRemaining = getAccountLockRemainingMs(active);
  if (lockMode === "unlock" && lockRemaining > 0) {
    lockMessage.textContent = `Too many attempts. Try again in ${formatLockDuration(lockRemaining)}.`;
  }
  syncPinBiometricButton();
  openPinPad();
}

function updatePinDots() {
  const length = pinPadValue.length;
  const slots = DEFAULT_PIN_LENGTH;
  pinPadDots.innerHTML = "";
  for (let i = 0; i < slots; i += 1) {
    const dot = document.createElement("span");
    dot.className = `pin-dot${i < length ? " filled" : ""}`;
    pinPadDots.appendChild(dot);
  }
}

function openPinPad() {
  retryTouchIdBtn.classList.add("hidden-module");
  pinPadPanel.classList.remove("hidden-module");
  pinPadValue = "";
  pinPadStep = lockMode === "setup" ? "setup-create" : "unlock";
  updatePinDots();
  syncPinBiometricButton();
  pinPadPanel.classList.remove("pinpad-enter");
  void pinPadPanel.offsetWidth;
  pinPadPanel.classList.add("pinpad-enter");
}

function syncPinBiometricButton() {
  if (!pinBiometricBtn) return;
  const active = ensureActiveAccount();
  const show = lockMode === "unlock" && active.touchIdEnabled;
  pinBiometricBtn.classList.toggle("hidden-module", !show);
}

function getExpectedPinLength() {
  if (pinPadStep === "setup-create" || pinPadStep === "setup-confirm") {
    return DEFAULT_PIN_LENGTH;
  }
  const active = ensureActiveAccount();
  return Math.min(8, Math.max(4, Number(active.passcodeLength) || DEFAULT_PIN_LENGTH));
}

function addPinDigit(digit) {
  if (!/^\d$/.test(digit)) return;
  if (pinPadValue.length >= 8) return;
  pinPadValue += digit;
  updatePinDots();
  if (pinPadValue.length >= getExpectedPinLength()) {
    void submitPinPadValue();
  }
}

function clearPinValue() {
  pinPadValue = "";
  updatePinDots();
}

function deletePinDigit() {
  if (!pinPadValue.length) return;
  pinPadValue = pinPadValue.slice(0, -1);
  updatePinDots();
}

async function submitPinPadValue() {
  if (isUnlockAnimating) return;
  const active = ensureActiveAccount();
  const pin = pinPadValue;
  const expectedLength = getExpectedPinLength();

  const lockRemaining = getAccountLockRemainingMs(active);
  if (lockMode === "unlock" && lockRemaining > 0) {
    failLock(`Too many attempts. Try again in ${formatLockDuration(lockRemaining)}.`);
    clearPinValue();
    return;
  }

  if (!new RegExp(`^\\d{${expectedLength}}$`).test(pin)) {
    failLock(`PIN must be ${expectedLength} digits.`);
    clearPinValue();
    return;
  }

  if (pinPadStep === "setup-create") {
    pendingSetupPin = pin;
    pinPadStep = "setup-confirm";
    clearPinValue();
    return;
  }

  if (pinPadStep === "setup-confirm") {
    if (pin !== pendingSetupPin) {
      pendingSetupPin = "";
      pinPadStep = "setup-create";
      failLock("PINs do not match.");
      clearPinValue();
      return;
    }
    await setAccountPasscode(active, pin);
    saveState();
    runUnlockAnimation();
    return;
  }

  const verification = await verifyAccountPasscode(active, pin);
  if (!verification.ok) {
    failLock(verification.message || "Incorrect PIN.");
    saveState();
    clearPinValue();
    return;
  }

  saveState();
  runUnlockAnimation();
}

async function enableTouchIdForActiveAccount() {
  const active = ensureActiveAccount();
  const contextError = getTouchIdContextError();
  if (contextError) {
    touchIdStatus.textContent = contextError;
    return false;
  }

  try {
    const credential = await navigator.credentials.create({
      publicKey: {
        challenge: randomBytes(32),
        rp: { name: "BudgetFlow" },
        user: {
          id: randomBytes(16),
          name: active.name,
          displayName: active.name,
        },
        pubKeyCredParams: [
          { type: "public-key", alg: -7 },
          { type: "public-key", alg: -257 },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "preferred",
          residentKey: "preferred",
        },
        timeout: 60000,
        attestation: "none",
      },
    });

    if (!credential) {
      touchIdStatus.textContent = "Biometrics enrollment canceled.";
      return false;
    }

    active.touchIdCredentialId = bytesToBase64Url(new Uint8Array(credential.rawId));
    active.touchIdEnabled = true;
    saveState();
    updateAccountUI();
    configureLockMode();
    touchIdStatus.textContent = "Biometrics enabled.";
    return true;
  } catch (error) {
    touchIdStatus.textContent = `Biometrics setup failed: ${error.message || "Unknown error"}`;
    return false;
  }
}

function disableTouchIdForActiveAccount() {
  const active = ensureActiveAccount();
  active.touchIdEnabled = false;
  active.touchIdCredentialId = null;
  saveState();
  updateAccountUI();
  configureLockMode();
  touchIdStatus.textContent = "Biometrics disabled.";
}

async function authenticateWithTouchId() {
  if (isTouchIdPrompting || isUnlockAnimating) return;
  const active = ensureActiveAccount();
  const lockRemaining = getAccountLockRemainingMs(active);
  if (lockRemaining > 0) {
    failLock(`Too many attempts. Try again in ${formatLockDuration(lockRemaining)}.`);
    return;
  }
  if (!active.touchIdEnabled || !active.touchIdCredentialId) {
    failLock("Biometrics is not enabled for this account.");
    return;
  }
  const contextError = getTouchIdContextError();
  if (contextError) {
    failLock(contextError, { showTouchRetry: true });
    return;
  }

  try {
    isTouchIdPrompting = true;
    const assertion = await navigator.credentials.get({
      publicKey: {
        challenge: randomBytes(32),
        allowCredentials: [
          {
            type: "public-key",
            id: base64UrlToBytes(active.touchIdCredentialId),
          },
        ],
        userVerification: "preferred",
        timeout: 60000,
      },
    });

    if (!assertion) {
      registerFailedAccountAttempt(active);
      saveState();
      failLock("Biometrics canceled.", { showTouchRetry: true });
      return;
    }

    resetAccountAuthState(active);
    saveState();
    lockMessage.textContent = "Biometrics verified.";
    runUnlockAnimation();
  } catch (error) {
    registerFailedAccountAttempt(active);
    saveState();
    failLock(`Biometrics failed: ${error.message || "Unknown error"}`, { showTouchRetry: true });
  } finally {
    isTouchIdPrompting = false;
  }
}

function openLockOverlay(context = "app") {
  resetLogoutSwipeGate();
  lockContext = context;
  configureLockMode();
  setScreen("lock");
  setTimeout(() => {
    pinPadPanel.focus?.();
  }, 120);
}

function unlockApp() {
  const wasSecurityGate = lockContext === "security";
  lockContext = "app";
  setScreen("app");
  lockPadlock.classList.remove("unlocking");
  pinPadPanel.classList.add("hidden-module");
  pinPadValue = "";
  pendingSetupPin = "";
  updatePinDots();
  lockPasscodeInput.value = "";
  lockConfirmInput.value = "";
  lockMessage.textContent = "";
  retryTouchIdBtn.classList.add("hidden-module");
  if (wasSecurityGate) {
    openSecuritySettingsAfterGate();
  }
}

function failLock(message, options = {}) {
  lockMessage.textContent = message;
  lockPadlock.classList.remove("unlocking");
  lockPadlock.classList.remove("error");
  void lockPadlock.offsetWidth;
  lockPadlock.classList.add("error");
  retryTouchIdBtn.classList.add("hidden-module");
}

function runUnlockAnimation() {
  if (isUnlockAnimating) return;
  isUnlockAnimating = true;
  lockMessage.textContent = "Unlocking...";
  lockPadlock.classList.remove("error");
  lockPadlock.classList.add("unlocking");
  setTimeout(() => {
    unlockApp();
    isUnlockAnimating = false;
  }, 650);
}

function refresh() {
  persistBudgetInputsToActive();
  renderSummary();
  renderExpenses();
  renderSpillOver();
  applyModulesVisibility();
  applyPlannerLayoutOrder();
  applyCompactMode();
  applyIphoneMode();
  applyDarkMode();
  applyColorScheme();
  requestAnimationFrame(updateMainScrollLock);
  saveState();
}

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const budget = getActiveBudgetData();

  budget.expenses.push({
    id: crypto.randomUUID(),
    date: dateInput.value,
    description: descInput.value.trim(),
    category: categoryInput.value,
    amount: Number(amountInput.value),
  });

  descInput.value = "";
  amountInput.value = "";

  refresh();
});

incomeInput.addEventListener("input", refresh);
targetInput.addEventListener("input", refresh);

currencyInput.addEventListener("change", () => {
  state.settings.currency = currencyInput.value;
  refresh();
});

themeInput.addEventListener("change", () => {
  state.settings.colorScheme = themeInput.value;
  refresh();
});

cycleDayInput.addEventListener("change", () => {
  const day = Math.min(28, Math.max(1, Number(cycleDayInput.value) || 1));
  state.settings.cycleDay = day;
  cycleDayInput.value = day;
  refresh();
});

compactInput.addEventListener("change", () => {
  state.settings.compactMode = compactInput.checked;
  refresh();
});

darkModeInput.addEventListener("change", () => {
  state.settings.darkMode = darkModeInput.checked;
  refresh();
});

iphoneModeInput.addEventListener("change", () => {
  state.settings.iphoneMode = iphoneModeInput.checked;
  refresh();
});

darkModeScheduleInput.addEventListener("change", () => {
  state.settings.darkModeScheduled = darkModeScheduleInput.checked;
  syncSettingsControls();
  refresh();
});

darkModeStartInput.addEventListener("change", () => {
  state.settings.darkModeStart = darkModeStartInput.value || "21:00";
  refresh();
});

darkModeEndInput.addEventListener("change", () => {
  state.settings.darkModeEnd = darkModeEndInput.value || "07:00";
  refresh();
});

autoWipeInput.addEventListener("change", () => {
  state.settings.autoWipeEnabled = autoWipeInput.checked;
  refresh();
});

panicShortcutInput.addEventListener("change", () => {
  state.settings.panicShortcutEnabled = panicShortcutInput.checked;
  refresh();
});

toggleSummary.addEventListener("change", () => {
  state.settings.modules.summary = toggleSummary.checked;
  refresh();
});

toggleAddExpense.addEventListener("change", () => {
  state.settings.modules.addExpense = toggleAddExpense.checked;
  refresh();
});

toggleBreakdown.addEventListener("change", () => {
  state.settings.modules.breakdown = toggleBreakdown.checked;
  refresh();
});

toggleExpenses.addEventListener("change", () => {
  state.settings.modules.expenses = toggleExpenses.checked;
  refresh();
});

function toggleLayoutEditFromSettings(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  setActiveTab("planner");
  setLayoutEditMode(!isLayoutEditMode);
  saveState();
}

if (toggleLayoutEditBtn) {
  toggleLayoutEditBtn.addEventListener("click", toggleLayoutEditFromSettings);
  toggleLayoutEditBtn.addEventListener("touchend", toggleLayoutEditFromSettings, { passive: false });
}

statusSettingsBtn.addEventListener("click", () => {
  const showingSettings = settingsPanel.classList.contains("active");
  setActiveTab(showingSettings ? "planner" : "settings");
  showAccountMenu(false);
});

statusLockBtn.addEventListener("click", () => {
  showAccountMenu(false);
  showLoggedOutScreen();
});

statusAccountBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  const hidden = accountMenu.classList.contains("hidden-module");
  showAccountMenu(hidden);
});

activeAccountRow.addEventListener("click", () => {
  showAccountMenu(false);
});

profileNameInput.addEventListener("input", () => {
  const active = ensureActiveAccount();
  const nextName = profileNameInput.value.trim();
  active.name = nextName || "Account";
  updateAccountUI();
  saveState();
});

profileImageInput.addEventListener("change", () => {
  const file = profileImageInput.files && profileImageInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const active = ensureActiveAccount();
    active.profileImage = String(reader.result || "");
    updateAccountUI();
    saveState();
  };
  reader.readAsDataURL(file);
});

clearProfileImageBtn.addEventListener("click", () => {
  const active = ensureActiveAccount();
  active.profileImage = null;
  updateAccountUI();
  saveState();
});

addAccountBtn.addEventListener("click", () => {
  showAccountMenu(false);
  showAddProfileScreen("app");
});

openAddProfilePageBtn.addEventListener("click", () => {
  showAddProfileScreen("app");
});

cancelAddProfileBtn.addEventListener("click", () => {
  addProfileMessage.textContent = "";
  setScreen(addProfileReturnMode);
});

addProfilePageForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = newProfileNameInput.value.trim();
  const passcode = newProfilePasscodeInput.value.trim();
  const confirm = newProfileConfirmInput.value.trim();
  const wantsTouchId = newProfileTouchIdInput.checked;

  if (!name) {
    addProfileMessage.textContent = "Profile name is required.";
    return;
  }

  if (!new RegExp(`^\\d{${DEFAULT_PIN_LENGTH}}$`).test(passcode)) {
    addProfileMessage.textContent = `PIN must be ${DEFAULT_PIN_LENGTH} digits.`;
    return;
  }

  if (passcode !== confirm) {
    addProfileMessage.textContent = "Passcodes do not match.";
    return;
  }

  const exists = state.security.accounts.some((account) => account.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    addProfileMessage.textContent = "A profile with that name already exists.";
    return;
  }

  const account = makeAccount(name);
  await setAccountPasscode(account, passcode);
  state.security.accounts.push(account);
  setActiveAccount(account.id);
  if (wantsTouchId) {
    const touchIdEnabled = await enableTouchIdForActiveAccount();
    if (!touchIdEnabled) {
      window.alert("Profile created, but Biometrics setup failed. You can enable it later in Security settings.");
    }
  }
  addProfilePageForm.reset();
  showLoggedOutScreen();
});

enableTouchIdBtn.addEventListener("click", () => {
  enableTouchIdForActiveAccount();
});

disableTouchIdBtn.addEventListener("click", () => {
  disableTouchIdForActiveAccount();
});

logoutBtn.addEventListener("click", () => {
  showLoggedOutScreen();
});

loggedOutProfiles.addEventListener("click", (event) => {
  const button = event.target.closest("[data-account-id]");
  if (!button) return;
  const accountId = button.dataset.accountId;
  setActiveAccount(accountId);
  if (shouldUseSwipeUnlock()) {
    armLogoutSwipeGate(accountId);
    return;
  }
  openLockOverlay();
});

toggleOtherProfilesBtn.addEventListener("click", () => {
  showOtherProfilesOnLoggedOut = !showOtherProfilesOnLoggedOut;
  renderLoggedOutProfiles();
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".account-menu-wrap")) {
    showAccountMenu(false);
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    hiddenAtMs = Date.now();
    return;
  }

  if (document.visibilityState === "visible" && hiddenAtMs) {
    const awayMs = Date.now() - hiddenAtMs;
    hiddenAtMs = null;

    // If the app was hidden for a while (e.g. laptop closed), require login again.
    if (awayMs >= AUTO_LOGOUT_AFTER_HIDDEN_MS && appShell.classList.contains("app-visible")) {
      showLoggedOutScreen();
    }
  }
});

window.addEventListener("resize", () => {
  requestAnimationFrame(updateMainScrollLock);
});

lockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (pinPadPanel.classList.contains("hidden-module")) return;
  void submitPinPadValue();
});

showPasscodeBtn.addEventListener("click", () => {
  openPinPad();
});

lockBackBtn.addEventListener("click", () => {
  lockMessage.textContent = "";
  pinPadPanel.classList.add("hidden-module");
  pinPadValue = "";
  pendingSetupPin = "";
  updatePinDots();
  lockPasscodeInput.value = "";
  lockConfirmInput.value = "";
  lockPadlock.classList.remove("unlocking", "error");
  retryTouchIdBtn.classList.add("hidden-module");
  if (lockContext === "security") {
    lockContext = "app";
    setScreen("app");
  } else {
    showLoggedOutScreen();
  }
});

retryTouchIdBtn.addEventListener("click", () => {
  retryTouchIdBtn.classList.add("hidden-module");
  authenticateWithTouchId();
});

pinKeys.forEach((button) => {
  button.addEventListener("click", () => {
    const digit = button.dataset.pinKey;
    const action = button.dataset.pinAction;
    if (digit) {
      addPinDigit(digit);
      return;
    }
    if (action === "clear") {
      clearPinValue();
      return;
    }
    if (action === "biometric") {
      authenticateWithTouchId();
      return;
    }
    if (action === "delete") {
      deletePinDigit();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (
    state.settings.panicShortcutEnabled &&
    (event.ctrlKey || event.metaKey) &&
    event.shiftKey &&
    event.key.toLowerCase() === "l"
  ) {
    event.preventDefault();
    showLoggedOutScreen();
    return;
  }

  if (!lockOverlay.classList.contains("active-screen")) return;
  if (pinPadPanel.classList.contains("hidden-module")) return;

  if (/^\d$/.test(event.key)) {
    event.preventDefault();
    addPinDigit(event.key);
    return;
  }
  if (event.key === "Backspace") {
    event.preventDefault();
    deletePinDigit();
    return;
  }
  if (event.key === "Delete") {
    event.preventDefault();
    clearPinValue();
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    void submitPinPadValue();
  }
});

loggedOutScreen.addEventListener(
  "touchstart",
  (event) => {
    if (!shouldUseSwipeUnlock() || !pendingSwipeUnlockAccountId) return;
    const touch = event.changedTouches && event.changedTouches[0];
    if (!touch) return;
    logoutSwipeStartY = touch.clientY;
    logoutSwipeStartX = touch.clientX;
  },
  { passive: true }
);

loggedOutScreen.addEventListener(
  "touchend",
  (event) => {
    if (!shouldUseSwipeUnlock() || !pendingSwipeUnlockAccountId) return;
    if (logoutSwipeStartY === null || logoutSwipeStartX === null) return;
    const touch = event.changedTouches && event.changedTouches[0];
    if (!touch) return;
    const deltaY = logoutSwipeStartY - touch.clientY;
    const deltaX = Math.abs(logoutSwipeStartX - touch.clientX);
    logoutSwipeStartY = null;
    logoutSwipeStartX = null;
    if (deltaY > 70 && deltaY > deltaX * 1.2) {
      completeLogoutSwipeGate();
    }
  },
  { passive: true }
);

exportBackupBtn.addEventListener("click", async () => {
  const passphrase = backupPassphraseInput.value;
  if (!passphrase || passphrase.length < 8) {
    securityToolsMessage.textContent = "Backup passphrase must be at least 8 characters.";
    return;
  }
  try {
    const backup = await createEncryptedBackup(passphrase);
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    a.href = url;
    a.download = `budgetflow-backup-${stamp}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    securityToolsMessage.textContent = "Encrypted backup exported.";
  } catch (error) {
    securityToolsMessage.textContent = `Export failed: ${error.message || "Unknown error"}`;
  }
});

importBackupBtn.addEventListener("click", () => {
  if (!backupPassphraseInput.value || backupPassphraseInput.value.length < 8) {
    securityToolsMessage.textContent = "Enter backup passphrase first.";
    return;
  }
  importBackupFileInput.value = "";
  importBackupFileInput.click();
});

importBackupFileInput.addEventListener("change", async () => {
  const file = importBackupFileInput.files && importBackupFileInput.files[0];
  if (!file) return;
  try {
    const text = await readFileAsText(file);
    const parsed = JSON.parse(text);
    const restoredState = await decryptBackupObject(backupPassphraseInput.value, parsed);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restoredState));
    loadState();
    syncSettingsControls();
    refresh();
    setActiveTab("planner");
    showLoggedOutScreen();
    securityToolsMessage.textContent = "Encrypted backup imported.";
  } catch (error) {
    securityToolsMessage.textContent = `Import failed: ${error.message || "Invalid passphrase or file."}`;
  }
});

changePasscodeForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const active = ensureActiveAccount();
  const current = currentPasscodeInput.value.trim();
  const next = newPasscodeInput.value.trim();
  const confirm = confirmPasscodeInput.value.trim();

  const verification = await verifyAccountPasscode(active, current);
  if (!verification.ok) {
    saveState();
    passcodeMessage.textContent = verification.message || "Current passcode is incorrect.";
    return;
  }

  if (!new RegExp(`^\\d{${DEFAULT_PIN_LENGTH}}$`).test(next)) {
    passcodeMessage.textContent = `New PIN must be ${DEFAULT_PIN_LENGTH} digits.`;
    return;
  }

  if (next !== confirm) {
    passcodeMessage.textContent = "New passcodes do not match.";
    return;
  }

  await setAccountPasscode(active, next);
  saveState();

  currentPasscodeInput.value = "";
  newPasscodeInput.value = "";
  confirmPasscodeInput.value = "";
  passcodeMessage.textContent = "Passcode updated.";
});

resetButton.addEventListener("click", () => {
  const budget = getActiveBudgetData();
  budget.expenses = [];
  budget.income = "4000";
  budget.target = "800";
  state.settings.currency = "NZD";
  state.settings.colorScheme = "ocean";
  state.settings.cycleDay = 1;
  state.settings.compactMode = false;
  state.settings.darkMode = false;
  state.settings.iphoneMode = false;
  state.settings.darkModeScheduled = false;
  state.settings.darkModeStart = "21:00";
  state.settings.darkModeEnd = "07:00";
  state.settings.autoWipeEnabled = false;
  state.settings.panicShortcutEnabled = false;
  state.settings.layoutOrder = [...DEFAULT_LAYOUT_ORDER];
  state.settings.modules = {
    summary: true,
    addExpense: true,
    breakdown: true,
    expenses: true,
  };

  incomeInput.value = budget.income;
  targetInput.value = budget.target;
  securityToolsMessage.textContent = "";
  syncSettingsControls();
  refresh();
});

loadState();
syncSettingsControls();
initSettingsAccordion();
setActiveTab("planner");
refresh();
updateStatusTime();
setInterval(updateStatusTime, 1000);
showLoggedOutScreen();
