<script>
	import Project from './Project.svelte'

	let project = {
		project: {
			name: '',
			author: ''
		}
	}

	let lastOpen = -1
	let currentTabIndex = 0;
	let tabs = {
		0: {
			title: 'Project',
			props: {},
			view: Project,
			id: 0
		}
	}

	function openTab(tab) {
		// Dont open tab twice
		for(let t of Object.values(tabs)) {
			if(t.title == tab.title) {
				selectTab(t.id)
				return
			}
		}

		tab.id =  getCurrentUnixTimestamp()
		tabs[tab.id] = tab
		tabs = tabs
		selectTab(tab.id)
	}

	function selectTab(index) {
		if(tabs[index] === undefined) return

		lastOpen = currentTabIndex

		currentTabIndex = index
	}

	function closeTab(index) {
		if(tabs[index] === undefined) return

		delete tabs[index]

		if(tabs[lastOpen] !== undefined) {
			currentTabIndex = lastOpen
		} else {
			currentTabIndex = 0
		}

		tabs = tabs
	}

	function getCurrentUnixTimestamp() {
		return Math.floor(Date.now() / 1000);
	}

	const tabTemplates = {
		Import: {
			title: 'Import',
			props: {str: "Import Options"},
			view: Project
		},
		Build: {
			title: 'Build',
			props: {str: "Build Options"},
			view: Project
		}
	}

	function getTemplate(name, props) {
		let temp = tabTemplates[name]
		temp.props = {
			...temp.props,
			...props
		}
		return temp
	}

	function openProps(name, props) {
		openTab(getTemplate(name, props))
	}

	function open(name) {
		openProps(name, {})
	}

</script>

<main>
	<div class="vsplit has-scrollbar">
		<div class="sidebar">

			<ul class="tree-view has-connector has-collapse-button has-scrollbar">
				<div>
					<b>Ohms Odyssey</b>
				</div>
				<hr>
				<details open>
					<summary>Overview</summary>
					<ul>
						<li>Project</li>
						<li on:dblclick={ () => open('Import', {})}>Import</li>
					  	<li on:dblclick={() => open('Build', {})}>Build</li>
					</ul>
				</details>
				<hr>
				<details open>
					<summary>Scenes</summary>
					<ul>
						<li>Splash</li>
						<li>Entry</li>
					</ul>
					<a class="llink">New...</a>
				</details>
				<hr>
				<details open>
					<summary>Resources</summary>
					<ul>
						<div>
							<details open>
								<summary>Textures</summary>
								<ul>
									<li>Test.tex</li>
								</ul>
							</details>
						</div>
						<div>
							<details open>
								<summary>Sounds</summary>
								<ul>
									<li>Test.aud</li>
								</ul>
							</details>
						</div>
						<div>
							<details open>
								<summary>Other</summary>
								<ul>
									<li>Test.vid</li>
								</ul>
							</details>
						</div>
					</ul>
					<a class="llink">New...</a>
				</details>
			</ul>

		</div>
		<div class="content surface">
			<section class="tabs">
				<menu role="tablist" aria-label="Windows">
					{#each Object.values(tabs) as tab}
						<button role="tab" aria-controls="tab-{tab.id}" aria-selected="{tab.id == currentTabIndex ? 'true' : 'false'}" on:click={selectTab(tab.id)}>{tab.title}</button>
					{/each}
				</menu>
				
				<div class="window active">
					<div class="title-bar">
						<div class="title-bar-text">{tabs[currentTabIndex].title}</div>
						<div class="title-bar-controls">
							{#if (tabs[currentTabIndex].id != 0)}
								<button aria-label="Close" on:click={() => closeTab(currentTabIndex)}></button>
							{/if}
							{#if (tabs[currentTabIndex].id == 0)}
								<button disabled aria-label="Close" on:click={() => closeTab(currentTabIndex)}></button>
							{/if}
						</div>
					</div>
					<div class="window-body has-space">
						<svelte:component this={tabs[currentTabIndex].view} {...tabs[currentTabIndex].props}></svelte:component>
					</div>
				</div>

			  </section>
		</div>
	</div>
</main>

<style>
	.vsplit {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: start;
		align-items: start;
		flex-direction: row;
		gap: 1%;
	}
	.sidebar {
		width: 30%;
		height: 100vh;
		top: 0;
		bottom: 0;
		padding: 8px;
		z-index: 99;
		display: flex;
		align-items: stretch;
		box-sizing: border-box;
		background-color: white;
	}

	.sidebar li {
		
	}

	.sidebar hr {
		opacity: 0%;
	}

	.sidebar li:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	.llink:hover {
		text-decoration: underline;
		cursor: pointer;
	}

	.content {
		width: 100%;
		height: 100%;
		padding-top: 1%;
		padding-right: 1%;
	}

	.window {
		height: 92vh;
	}

	.window .window-body {
		height: 92%;
	}
</style>