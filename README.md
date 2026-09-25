PROJECT: MULTICHAIN DAPP PROJECT BUILDER
TYPE: Production full-stack application
PRIMARY UX: Mobile-first 5-step project creation wizard
OUTPUTS: Hosted project, custom-domain deployment, complete ZIP build, standalone integration JS bundle

============================================================
0. PRIMARY OBJECTIVE
============================================================

Build a production-oriented multichain DApp Project Builder.

The product must allow a user to configure a DApp through a visual wizard instead of manually rebuilding wallet/network/template integration for every project.

Core pipeline:

PROJECT CONFIGURATION
        ↓
TEMPLATE SELECTION
        ↓
WALLET MODAL CONFIGURATION
        ↓
DAPP INTEGRATION CONFIGURATION
        ↓
LIVE PREVIEW
        ↓
BUILD COMPILER
        ↓
EXPORT / DEPLOY

The builder itself and the generated project runtime MUST be separate systems.

Do NOT create a static mockup.

Buttons, wizard state, previews, persistence, build generation, ZIP generation, JS generation, and deployment records must actually function.

Do not use fake loading states to simulate functionality.

============================================================
1. VISUAL DIRECTION
============================================================

Reproduce the visual language shown in the supplied screenshots.

Design:

- extremely dark interface
- #0A0A0B / #101011 backgrounds
- elevated #181819 / #202021 cards
- thin #303033 borders
- large rounded cards
- white primary typography
- muted gray secondary typography
- lime/acid-green active state
- approximately #B8FF55 accent
- large mobile-friendly controls
- fixed bottom navigation during wizard
- selected cards receive lime border
- selected cards receive checkmark indicator
- subtle shadows/glows only
- no excessive gradients
- no generic SaaS dashboard appearance

Responsive breakpoints:

Mobile:
320–767px

Tablet:
768–1199px

Desktop:
1200px+

The mobile version is the primary reference.

Wizard header:

[ ← ]  Project
       STEP 1/5

Content is vertically scrollable.

Bottom action bar remains fixed:

[ ← Back ]                    [ Next → ]

Final screen:

[ ← Back ]                    [ Publish ]

============================================================
2. APPLICATION ARCHITECTURE
============================================================

Use a monorepo.

Suggested architecture:

/
├── apps/
│   ├── dashboard/
│   └── build-api/
│
├── packages/
│   ├── project-schema/
│   ├── template-engine/
│   ├── modal-engine/
│   ├── wallet-runtime/
│   ├── evm-adapter/
│   ├── solana-adapter/
│   ├── tron-adapter/
│   ├── contract-runtime/
│   ├── build-engine/
│   ├── deployment-engine/
│   └── shared-ui/
│
├── templates/
│   ├── bob/
│   ├── generic-dapp/
│   ├── staking/
│   └── blank/
│
├── builds/
├── docker/
├── docker-compose.yml
├── package.json
└── README.md

Preferred stack:

Frontend:
- Next.js
- React
- TypeScript
- Tailwind CSS

Backend:
- Node.js
- TypeScript
- REST API

Database:
- PostgreSQL

ORM:
- Prisma or Drizzle

Queue:
- Redis + BullMQ

Web3:
- viem as primary EVM primitive
- WalletConnect/Reown-compatible wallet connection layer
- Solana Wallet Adapter for Solana
- TronWeb for TRON

Build:
- esbuild or Vite programmatic build API

Archive:
- ZIP generation server-side

Infrastructure:
- Docker
- Docker Compose

Reverse proxy:
- Caddy or nginx

All package boundaries should remain clean enough that wallet runtimes and generated bundles do NOT import dashboard-specific code.

============================================================
3. WIZARD STATE MACHINE
============================================================

Implement the builder as an explicit state machine.

Steps:

1. PROJECT
2. TEMPLATE
3. MODAL STYLE
4. INTEGRATION
5. BUILD & PUBLISH

State:

ProjectDraft {
    id
    name
    slug

    network

    template

    modal

    integration

    deployment

    createdAt
    updatedAt
}

Persist the draft between wizard steps.

Refreshing the browser must NOT destroy the configuration.

Users must be able to move backward without losing values.

Validate every step before allowing Next.

============================================================
4. STEP 1 — PROJECT
============================================================

Header:

Project
STEP 1/5

Fields:

PROJECT NAME

Input example:

New project

Description:

Used for the project record and default managed subdomain.

Then:

SELECT NETWORK

Cards:

EVM

Subtitle:
ETH, BSC, ARB, Polygon, Base, L2s — ERC-20, NFT

Solana

Subtitle:
SOL, SPL & SPL-2022, NFT, Stake

TRON

Subtitle:
TRX, TRC-20

Only one primary network family can be selected for a project.

Selected state:

lime border
lime checkmark

Network enum:

evm
solana
tron

For EVM, support configurable chains including:

Ethereum
BNB Smart Chain
Arbitrum
Polygon
Base

Do NOT hard-code the architecture around Ethereum only.

============================================================
5. STEP 2 — TEMPLATE
============================================================

Header:

Template
STEP 2/5

Display visual template cards.

Each template contains:

id
name
description
thumbnail
supportedNetworks
version
sourceDirectory

Examples:

BOB
Generic DApp
Staking
Blank

Each card needs:

thumbnail
name
short description
Preview button
Select action

PREVIEW must open a large overlay.

Overlay:

Preview                        [ X ]

[ rendered template preview ]

Preview should render the actual template or sandboxed generated representation rather than simply enlarging the thumbnail.

The template catalog must be data-driven.

Adding another template should NOT require rewriting the wizard.

Example manifest:

{
  "id": "bob",
  "name": "BOB",
  "version": "1.0.0",
  "supportedNetworks": ["evm"],
  "entry": "./templates/bob",
  "thumbnail": "/templates/bob/preview.webp"
}

============================================================
6. STEP 3 — MODAL STYLE
============================================================

Header:

Modal Style
STEP 3/5

Title:

Select Modal Style

Description:

Choose the modal design for your project.

THEME:

[ 🌙 Dark Mode ] [ ☀ Light Mode ]

Below this, display modal style cards.

Examples:

STYLE 1
Classic wallet list

STYLE 2
Wallet grid

STYLE 3
Compact modal

Each style must have:

- visual preview
- select state
- Preview button
- theme-aware rendering

Preview opens:

Preview                       [ X ]

Then display an actual modal rendering.

Example wallet UI:

Connect Wallet

WalletConnect
MetaMask
Trust Wallet
Browser Wallet
Ledger
Coinbase
Safe
All Wallets

The builder's visual modal configuration and actual wallet provider implementation must remain separated.

Modal configuration example:

{
    "style": "style-1",
    "theme": "dark",
    "walletOrder": [
        "walletconnect",
        "metamask",
        "trust",
        "browser",
        "ledger",
        "coinbase",
        "safe"
    ]
}

============================================================
7. WALLET RUNTIME
============================================================

Create a reusable wallet runtime.

Public interface:

WalletRuntime.open()
WalletRuntime.close()
WalletRuntime.connect()
WalletRuntime.disconnect()
WalletRuntime.getAccount()
WalletRuntime.getChainId()
WalletRuntime.switchChain()
WalletRuntime.getProvider()

Events:

wallet:opened
wallet:closed
wallet:connecting
wallet:connected
wallet:disconnected
wallet:error
account:changed
chain:changed

The modal is presentation.

WalletRuntime is functionality.

Do not mix them.

============================================================
8. EVM ADAPTER
============================================================

Implement:

EVMAdapter

Interface:

connect()
disconnect()
getAccount()
getChainId()
switchChain(chainId)
getBalance(address)
readContract(config)
simulateContract(config)
writeContract(config)
waitForReceipt(hash)

Use ABI-based contract interactions.

Contract configuration must explicitly specify:

chain
contract address
ABI
function
arguments
value if applicable

The generated runtime must not invent transactions.

The project configuration determines what contract method is associated with an action.

============================================================
9. SOLANA ADAPTER
============================================================

Implement equivalent adapter boundary:

SolanaAdapter

Responsibilities:

connect
disconnect
publicKey
network selection
RPC connection
transaction preparation
wallet transaction request
confirmation

Keep Solana-specific implementation outside shared wallet UI.

============================================================
10. TRON ADAPTER
============================================================

Implement:

TronAdapter

Responsibilities:

connect
disconnect
address
network
balance
contract read
contract transaction
confirmation

Again:

UI → common runtime interface → network adapter.

============================================================
11. STEP 4 — INTEGRATION
============================================================

Header:

Integration
STEP 4/5

This page determines how the generated runtime integrates into a website.

Sections:

NETWORK CONFIGURATION

CHAIN
RPC
CHAIN ID

CONTRACT CONFIGURATION

Contract Address

ABI input:
- paste ABI
- upload ABI JSON

Validate ABI JSON.

ACTION CONFIGURATION

Allow the user to define project actions.

Action model:

{
    "id": "...",
    "name": "Stake",
    "trigger": {
        "type": "selector",
        "selector": "#stake-button"
    },
    "contract": {
        "address": "0x...",
        "functionName": "stake",
        "args": []
    }
}

Supported trigger modes:

button selector
CSS selector
programmatic/manual invocation

Allow:

CONNECT WALLET ACTION
DISCONNECT ACTION
CONTRACT READ ACTION
CONTRACT WRITE ACTION

For contract write actions, use:

wallet connection
→ validate chain
→ simulate when supported
→ wallet transaction request
→ broadcast
→ receipt monitoring
→ result

============================================================
12. TARGET MODE
============================================================

Provide:

TARGET

○ Entire generated template
○ Specific button
○ Existing website integration

Specific button:

CSS SELECTOR

Example:

#connect-wallet

or

.connect-wallet

Existing website integration generates a standalone browser bundle.

============================================================
13. LIVE PREVIEW ENGINE
============================================================

Every major configuration change should update preview state.

Preview should support:

template
theme
modal
network
button integration

Use an isolated iframe or sandbox.

Do NOT inject arbitrary preview HTML directly into the dashboard DOM.

Communication:

Builder
   │
   │ postMessage
   ▼
Preview iframe

Message examples:

PROJECT_CONFIG_UPDATED
OPEN_WALLET_MODAL
SET_THEME
SET_TEMPLATE
RELOAD_PREVIEW

============================================================
14. STEP 5 — PROJECT PREVIEW
============================================================

Before publishing, show:

Project preview

PROJECT
Nb

NETWORK
EVM

TEMPLATE
BOB

MODAL
Style 1

THEME
dark

TARGET
specific-button

CHAIN
Ethereum

CONTRACT
0x1234...5678

Every section should provide an Edit action returning the user to the corresponding step.

============================================================
15. OUTPUT OPTIONS
============================================================

Present large selectable cards:

MANAGED DOMAIN

Deploy the build on a shared domain.

OWN DOMAIN

Connect an existing domain.

DOWNLOAD BUILD

Export the full build directory as a ZIP archive for independent hosting.

DOWNLOAD JS

Export only the integration JS bundle to embed in an existing website.

Only one primary publishing operation needs to be selected at a time.

============================================================
16. BUILD ENGINE
============================================================

This is a critical subsystem.

Create:

BuildEngine.compile(projectConfig)

Pipeline:

validate configuration
        ↓
resolve template
        ↓
resolve network adapter
        ↓
resolve modal
        ↓
generate runtime configuration
        ↓
inject configuration
        ↓
bundle JS
        ↓
bundle template assets
        ↓
minify production assets
        ↓
generate manifest
        ↓
write artifact
        ↓
return build metadata

Build output example:

builds/{projectId}/{buildId}/

    index.html
    assets/
    app.js
    project-runtime.js
    project.json
    manifest.json

Build records:

Build {
    id
    projectId
    version
    status
    artifactPath
    bundlePath
    createdAt
}

Status:

queued
building
completed
failed

============================================================
17. STANDALONE JS COMPILER
============================================================

DOWNLOAD JS must generate a genuine browser bundle.

Example:

project-runtime.min.js

It must contain:

project configuration
modal runtime
wallet runtime
selected network adapter
contract adapter
event system
DOM trigger integration

Do NOT include dashboard code.

Usage:

<script src="/project-runtime.min.js"></script>

The generated runtime exposes:

window.ProjectRuntime

API:

ProjectRuntime.init()
ProjectRuntime.open()
ProjectRuntime.close()
ProjectRuntime.connect()
ProjectRuntime.disconnect()
ProjectRuntime.getAccount()
ProjectRuntime.getChainId()
ProjectRuntime.readContract(...)
ProjectRuntime.writeContract(...)

Also expose event subscription:

ProjectRuntime.on(event, handler)
ProjectRuntime.off(event, handler)

Auto initialization:

DOMContentLoaded
        ↓
read embedded configuration
        ↓
bind configured selectors
        ↓
initialize network adapter
        ↓
wait for user interaction

============================================================
18. GENERATED JS INTEGRATION
============================================================

Example generated-site integration:

<button id="connect-wallet">
    Connect Wallet
</button>

<script src="/project-runtime.min.js"></script>

<script>
document.addEventListener("DOMContentLoaded", async () => {
    await ProjectRuntime.init();

    document
        .querySelector("#connect-wallet")
        ?.addEventListener("click", () => {
            ProjectRuntime.open();
        });
});
</script>

The compiler should generate selector binding automatically when configured through the wizard.

============================================================
19. BUILD API
============================================================

Implement real API routes.

POST /api/projects

GET /api/projects/:id

PATCH /api/projects/:id

DELETE /api/projects/:id

POST /api/projects/:id/build

GET /api/builds/:id

GET /api/builds/:id/download

GET /api/builds/:id/javascript

POST /api/projects/:id/deploy

GET /api/projects/:id/deployments

POST /api/projects/:id/domain

GET /api/projects/:id/preview

Build request:

POST /api/projects/{id}/build

Response:

{
    "buildId": "...",
    "status": "queued"
}

Worker performs compilation.

============================================================
20. BUILD QUEUE
============================================================

Do not execute large builds directly inside the HTTP request.

Architecture:

Dashboard
   ↓
Build API
   ↓
Redis
   ↓
BullMQ
   ↓
Build Worker
   ↓
BuildEngine
   ↓
Artifact Storage

Worker concurrency must be configurable.

Environment:

BUILD_WORKER_CONCURRENCY=4

============================================================
21. DOWNLOAD BUILD
============================================================

DOWNLOAD BUILD must create an actual ZIP.

Example:

nb-build-v1.zip

Containing:

index.html
assets/
app.js
project-runtime.min.js
manifest.json

ZIP must be independently hostable.

Do not create an empty or demonstration archive.

============================================================
22. MANAGED DEPLOYMENT
============================================================

Managed domain format:

{project-slug}.{BASE_DOMAIN}

Example:

nb.apps.example.com

DeploymentEngine:

createDeployment()
publishBuild()
rollbackDeployment()
getDeployment()
deleteDeployment()

Deployment:

Deployment {
    id
    projectId
    buildId
    hostname
    status
    createdAt
}

============================================================
23. CUSTOM DOMAIN
============================================================

Own Domain flow:

Enter domain.

Example:

app.example.com

Generate required DNS configuration.

Display:

TYPE
NAME
VALUE
STATUS

Verify DNS before activating domain.

Statuses:

pending
verified
active
failed

Do not mark a domain active without successful verification.

============================================================
24. DATABASE
============================================================

Minimum entities:

User
Project
ProjectDraft
Template
Build
Deployment
Domain
AuditEvent

Project:

id
userId
name
slug
network
templateId
modalStyle
theme
config JSON
createdAt
updatedAt

Build:

id
projectId
version
status
artifactPath
bundlePath
error
createdAt

Deployment:

id
projectId
buildId
hostname
status
createdAt

Domain:

id
projectId
hostname
verificationToken
status
createdAt

============================================================
25. CONFIGURATION SCHEMA
============================================================

Use one canonical versioned schema.

Example:

{
  "schemaVersion": 1,

  "project": {
    "name": "Nb",
    "slug": "nb"
  },

  "network": {
    "family": "evm",
    "chainId": 1
  },

  "template": {
    "id": "bob"
  },

  "modal": {
    "style": "style-1",
    "theme": "dark"
  },

  "integration": {
    "target": "button",
    "selector": "#connect-wallet"
  },

  "actions": []
}

Validate this schema on both frontend and backend.

Never trust client configuration without server validation.

============================================================
26. PROJECT RUNTIME CONFIG
============================================================

Generated builds should consume immutable runtime configuration.

Example:

window.__PROJECT_CONFIG__ = {
    schemaVersion: 1,
    network: {
        family: "evm",
        chainId: 1
    },
    modal: {
        style: "style-1",
        theme: "dark"
    },
    integration: {
        selector: "#connect-wallet"
    }
};

Do not embed backend credentials.

Never put private API keys, deployment credentials, database credentials, or signing keys inside generated browser bundles.

============================================================
27. STATE MANAGEMENT
============================================================

Separate:

SERVER STATE
PROJECT DRAFT STATE
WALLET STATE
PREVIEW STATE
BUILD STATE

Do not create one enormous global store.

Suggested:

ProjectStore
WalletStore
PreviewStore
BuildStore

Project draft should autosave after configuration changes using debounce.

Display:

Saving...
Saved
Save failed

============================================================
28. ERROR MODEL
============================================================

Use normalized application errors:

{
    "code": "BUILD_FAILED",
    "message": "Project compilation failed.",
    "details": {}
}

Error classes:

VALIDATION_ERROR
NETWORK_ERROR
WALLET_ERROR
RPC_ERROR
CONTRACT_ERROR
BUILD_FAILED
DEPLOYMENT_FAILED
DOMAIN_VERIFICATION_FAILED

Do not expose stack traces to browser users in production.

============================================================
29. BUILD LOGS
============================================================

Build screen should show actual build stages:

Preparing project
Loading template
Resolving dependencies
Generating runtime
Bundling JavaScript
Optimizing assets
Creating artifact
Completed

These states must correspond to actual worker progress.

Do not fake percentages.

============================================================
30. AUDIT EVENTS
============================================================

Record important lifecycle events:

PROJECT_CREATED
PROJECT_UPDATED
BUILD_STARTED
BUILD_COMPLETED
BUILD_FAILED
DEPLOYMENT_CREATED
DEPLOYMENT_UPDATED
DOMAIN_ADDED
DOMAIN_VERIFIED

============================================================
31. SECURITY BOUNDARIES
============================================================

Treat generated project configuration as untrusted input.

Validate:

project names
slugs
CSS selectors
contract addresses
ABIs
RPC URLs
domain names
uploaded JSON

Build workers should run with restricted filesystem access.

Prevent path traversal.

A template ID must resolve through the registered template catalog rather than arbitrary filesystem paths.

Preview HTML must run inside an isolated iframe.

Never expose server environment variables to generated frontend code.

============================================================
32. DOCKER
============================================================

Provide Dockerfiles and docker-compose.yml.

Services:

dashboard
api
worker
postgres
redis
reverse-proxy

Example topology:

Internet
   │
   ▼
Caddy
   ├──── Dashboard
   │
   └──── API
            │
            ├── PostgreSQL
            └── Redis
                  │
                  ▼
                Worker
                  │
                  ▼
             Build Storage

The complete development environment must launch using:

docker compose up -d

============================================================
33. ENVIRONMENT VARIABLES
============================================================

Provide .env.example.

Include at minimum:

NODE_ENV=

DATABASE_URL=

REDIS_URL=

APP_URL=
API_URL=

BASE_DOMAIN=

BUILD_STORAGE_PATH=
BUILD_WORKER_CONCURRENCY=

EVM_RPC_ETHEREUM=
EVM_RPC_BSC=
EVM_RPC_ARBITRUM=
EVM_RPC_POLYGON=
EVM_RPC_BASE=

SOLANA_RPC_URL=

TRON_RPC_URL=

WALLETCONNECT_PROJECT_ID=

Do not put actual credentials in the repository.

============================================================
34. PROJECT DASHBOARD
============================================================

Outside the wizard provide:

Projects

[ + New Project ]

Each project card:

name
network
template
last build
deployment
updated time

Actions:

Edit
Preview
Build
Deploy
Download
Settings
Delete

============================================================
35. PROJECT DETAIL PAGE
============================================================

Tabs:

Overview
Configuration
Builds
Deployments
Domains
Logs

Overview should show:

Project
Network
Template
Modal
Theme
Target
Latest Build
Current Deployment

============================================================
36. BUILD HISTORY
============================================================

Never overwrite previous builds.

Version them:

v1
v2
v3

Allow:

Download
Deploy
View metadata

Deployment should reference a specific immutable build.

This allows rollback.

============================================================
37. UI COMPONENT SYSTEM
============================================================

Create reusable components:

WizardShell
WizardHeader
WizardFooter
SelectionCard
NetworkCard
TemplateCard
ModalCard
ThemeSelector
PreviewOverlay
ProjectSummary
BuildOptionCard
FormField
CodeEditor
AbiEditor
StatusBadge
BuildProgress
DomainStatus
ConfirmationDialog

Do not duplicate markup across steps.

============================================================
38. MOBILE BEHAVIOR
============================================================

The screenshots represent the required mobile interaction model.

Important:

- full-width cards
- approximately 16–24px page padding
- large tap targets
- fixed footer
- scroll content behind footer
- safe-area support for iPhone
- modal previews nearly full-screen
- no horizontal overflow

Use:

env(safe-area-inset-bottom)

for mobile footer padding.

============================================================
39. ACCESSIBILITY
============================================================

Every interactive card must be keyboard accessible.

Provide:

aria labels
focus states
semantic buttons
modal focus trapping
Escape-to-close on desktop
proper form labels

Do not make clickable divs without keyboard behavior.

============================================================
40. LOADING STATES
============================================================

Real loading states for:

project save
preview rendering
wallet connection
build
deployment
domain verification
download preparation

Disable duplicate submissions while an operation is active.

============================================================
41. CONTRACT ACTION ENGINE
============================================================

Actions should be data-driven.

Do not hard-code "stake", "claim", etc. into the compiler.

Generic model:

ActionDefinition {
    id
    label
    type

    trigger

    network

    contract

    successBehavior

    errorBehavior
}

EVM contract action:

{
    "type": "contract-write",

    "network": {
        "family": "evm",
        "chainId": 1
    },

    "contract": {
        "address": "0x...",
        "abi": [],
        "functionName": "stake",
        "args": []
    }
}

Runtime:

trigger
   ↓
ensure wallet connection
   ↓
ensure expected chain
   ↓
resolve ABI/function
   ↓
resolve arguments
   ↓
simulate
   ↓
request transaction from connected wallet
   ↓
broadcast
   ↓
wait for receipt
   ↓
emit result

============================================================
42. RUNTIME EVENT BUS
============================================================

Implement a small event bus.

Events:

runtime:ready

modal:open
modal:close

wallet:connecting
wallet:connected
wallet:disconnected
wallet:error

transaction:preparing
transaction:requested
transaction:submitted
transaction:confirmed
transaction:failed

Example:

ProjectRuntime.on("wallet:connected", ({ address }) => {
    console.log(address);
});

============================================================
43. BUILD MANIFEST
============================================================

Every build generates:

manifest.json

Example:

{
    "projectId": "...",
    "buildId": "...",
    "version": 4,
    "schemaVersion": 1,
    "network": "evm",
    "template": "bob",
    "modal": "style-1",
    "theme": "dark",
    "createdAt": "..."
}

============================================================
44. ACCEPTANCE TESTS
============================================================

The project is NOT complete until all of these work.

TEST 1

Create project.

Enter name.

Select EVM.

Refresh browser.

Configuration remains.

TEST 2

Select BOB template.

Open Preview.

Actual preview opens.

Close preview.

Selection remains.

TEST 3

Select Dark Mode.

Select Style 1.

Preview wallet modal.

Correct modal renders.

TEST 4

Configure integration selector:

#connect-wallet

Save.

Reload.

Selector remains.

TEST 5

Provide valid contract ABI.

Parser validates it.

Invalid ABI produces validation error.

TEST 6

Build project.

Worker receives job.

Build completes.

Database Build record becomes completed.

TEST 7

Download Build.

Receive valid ZIP.

Extract it.

index.html and assets are present.

TEST 8

Download JS.

Receive actual:

project-runtime.min.js

Bundle loads in an independent HTML document.

TEST 9

Embed:

<script src="project-runtime.min.js"></script>

Configured Connect Wallet button opens the selected wallet modal.

TEST 10

Connect supported wallet.

Runtime emits:

wallet:connected

with connected account information.

TEST 11

Configured legitimate contract action uses selected chain, address, ABI and function.

Wallet receives the corresponding transaction request.

TEST 12

Deploy build.

Deployment references correct build ID.

TEST 13

Create a newer build.

Previous build remains available.

TEST 14

Rollback/redeploy previous build.

Deployment changes to selected immutable build.

TEST 15

Mobile UI at approximately 390px width matches the supplied screenshot structure without horizontal overflow.

============================================================
45. REQUIRED DEVELOPMENT ORDER
============================================================

Build in this order:

PHASE 1

Monorepo
Database
Project schema
API
Docker environment

PHASE 2

Wizard shell
Step navigation
Draft persistence

PHASE 3

Project/network selector
Template system
Preview system

PHASE 4

Modal system
Theme system
Wallet runtime

PHASE 5

Network adapters

PHASE 6

Integration/action configuration

PHASE 7

Build engine
Build worker
Artifact generation

PHASE 8

Standalone JS compiler

PHASE 9

ZIP export

PHASE 10

Managed deployments
Domains

PHASE 11

Build history
Rollback
Audit logs

PHASE 12

Responsive QA
Integration tests
Production hardening

============================================================
46. NON-NEGOTIABLE IMPLEMENTATION RULES
============================================================

Do not return only UI mockups.

Do not build dead buttons.

Do not use placeholder API responses.

Do not fake deployment success.

Do not fake build progress.

Do not create fake wallet connections.

Do not create fake ZIP downloads.

Do not create fake JavaScript exports.

Do not place all application logic in one React component.

Do not couple template rendering directly to the wizard.

Do not couple wallet connection directly to modal presentation.

Do not expose secrets to browser bundles.

Do not overwrite previous builds.

Do not discard wizard state on refresh.

All implemented functionality must use actual application state and actual backend operations.

============================================================
47. FINAL PRODUCT BEHAVIOR
============================================================

The completed workflow must feel like:

New Project
      ↓
Choose Network
      ↓
Choose Website Template
      ↓
Preview Template
      ↓
Choose Wallet Modal
      ↓
Choose Dark/Light Theme
      ↓
Preview Wallet Modal
      ↓
Configure Website Integration
     
