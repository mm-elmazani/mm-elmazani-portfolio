/* ========================================
   ACTIVITIES-SIMPLE.JS - Lecture du fichier JSON
   Portfolio TI EPHEC - Mohamed El Mazani
   ======================================== */

// ========================================
// 1. CONFIGURATION
// ========================================
const ActivitiesConfig = {
    dataPath: 'data/activities.json',  // Chemin sans ./ au début
    refreshInterval: 5000,
    enableAutoRefresh: false,
    lastModified: null,
    currentData: null
};

// ========================================
// 2. INITIALISATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('📚 Chargement des activités depuis JSON...');
    initActivitiesFromJSON();
});

async function initActivitiesFromJSON() {
    try {
        // Charger les données initiales (initializeUI() sera appelé dans loadActivitiesData())
        await loadActivitiesData();
        
        // Activer le rafraîchissement automatique si nécessaire
        if (ActivitiesConfig.enableAutoRefresh) {
            setInterval(checkForUpdates, ActivitiesConfig.refreshInterval);
            console.log('🔄 Auto-refresh activé (mode développement)');
        }
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        showError('Impossible de charger les activités');
    }
}

// ========================================
// 3. CHARGEMENT DES DONNÉES
// ========================================
async function loadActivitiesData() {
    console.log('🔄 Tentative de chargement depuis:', ActivitiesConfig.dataPath);
    
    try {
        const response = await fetch(ActivitiesConfig.dataPath);
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('📦 Données reçues:', data);
        
        ActivitiesConfig.currentData = data;
        ActivitiesConfig.lastModified = new Date().toISOString();
        
        console.log(`✅ ${data.activities.length} activités chargées`);
        console.log(`📊 Total: ${data.statistics.currentTotalHours}h / 60h (${data.statistics.completionPercentage}%)`);
        
        // Afficher les données
        displayActivities(data.activities);
        updateStatistics(data.statistics);
        updateValidation(data.validation);
        displaySuggestions(data.suggestions);
        
        // ✅ Initialiser les filtres APRÈS que les données soient chargées
        initializeUI();
        
        return data;
        
    } catch (error) {
        console.error('❌ Erreur de chargement:', error);
        console.error('Vérifiez que le fichier existe à:', ActivitiesConfig.dataPath);
        throw error;
    }
}

// ========================================
// 4. VÉRIFICATION DES MISES À JOUR
// ========================================
async function checkForUpdates() {
    try {
        const response = await fetch(ActivitiesConfig.dataPath);
        const newData = await response.json();
        
        if (JSON.stringify(newData) !== JSON.stringify(ActivitiesConfig.currentData)) {
            console.log('🔄 Nouvelles données détectées!');
            ActivitiesConfig.currentData = newData;
            
            displayActivities(newData.activities);
            updateStatistics(newData.statistics);
            updateValidation(newData.validation);
            
            showNotification('Activités mises à jour!', 'success');
        }
    } catch (error) {
        console.error('Erreur lors de la vérification des mises à jour:', error);
    }
}

// ========================================
// 5. AFFICHAGE DES ACTIVITÉS
// ========================================
function displayActivities(activities) {
    const container = document.getElementById('activities-list') || 
                     document.querySelector('.activities-grid');
    
    if (!container) {
        console.warn('Container des activités non trouvé');
        return;
    }
    
    activities.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = activities.map(activity => createActivityCard(activity)).join('');
    
    addActivityEventListeners();
}

function createActivityCard(activity) {
    const statusIcons = {
        'completed': '🟢',
        'pending': '🔵',
        'draft': '🟡'
    };
    
    const statusLabels = {
        'completed': 'Validé',
        'pending': 'En cours',
        'draft': 'Brouillon'
    };
    
    return `
        <div class="activity-card" data-theme="${activity.theme}" data-status="${activity.status}">
            <div class="activity-header">
                <span class="activity-badge ${activity.status}">
                    ${statusIcons[activity.status]} ${statusLabels[activity.status]}
                </span>
                <span class="activity-hours">${activity.hours}h</span>
            </div>
            
            <h3 class="activity-title">${activity.title}</h3>
            
            <div class="activity-meta">
                <span class="meta-item">🏷️ ${activity.theme}</span>
                <span class="meta-item">📋 ${activity.type}</span>
                <span class="meta-item">📅 ${formatDate(activity.date)}</span>
            </div>
            
            <p class="activity-description">${activity.description}</p>
            
            <div class="activity-proof">
                <strong>Preuve:</strong> ${activity.proof.description}
                ${activity.proof.file ? `<span class="proof-file">📎 ${activity.proof.file}</span>` : ''}
            </div>
            
            ${activity.skills && activity.skills.length > 0 ? `
                <div class="activity-skills">
                    ${activity.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            ` : ''}
            
            <button class="btn-expand" onclick="openReflectionModal('${activity.id}')">
                📖 Lire l'analyse réflexive
            </button>
        </div>
    `;
}

// 3. NOUVELLE fonction pour ouvrir le modal
function openReflectionModal(activityId) {
    const activity = ActivitiesConfig.currentData.activities.find(a => a.id === activityId);
    if (!activity) return;
    
    // Vérifier si le modal existe déjà
    let modal = document.getElementById('reflection-modal');
    if (!modal) {
        // Créer le modal s'il n'existe pas
        modal = document.createElement('div');
        modal.id = 'reflection-modal';
        modal.className = 'reflection-modal';
        document.body.appendChild(modal);
        
        // Ajouter l'événement de fermeture sur clic overlay
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeReflectionModal();
            }
        });
    }
    
    // Remplir le contenu du modal
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <button class="modal-close" onclick="closeReflectionModal()">×</button>
                <h2 class="modal-title">${activity.title}</h2>
                <div class="modal-meta">
                    <span class="modal-meta-item">🏷️ ${activity.theme}</span>
                    <span class="modal-meta-item">⏱️ ${activity.hours} heures</span>
                    <span class="modal-meta-item">📅 ${formatDate(activity.date)}</span>
                </div>
            </div>
            
            <div class="modal-body">
                <div class="reflection-section">
                    <h3>📍 Contexte</h3>
                    <p>${activity.reflection.context}</p>
                </div>
                
                <div class="reflection-section">
                    <h3>📝 Faits et déroulement</h3>
                    <p>${activity.reflection.facts}</p>
                </div>
                
                <div class="reflection-section">
                    <h3>🎯 Lien avec le projet professionnel</h3>
                    <p>${activity.reflection.projectLink}</p>
                </div>
                
                <div class="reflection-section">
                    <h3>💡 Compétences développées</h3>
                    <p>${activity.reflection.skills}</p>
                </div>
                
                <div class="reflection-section">
                    <h3>🔮 Conclusion et perspectives</h3>
                    <p>${activity.reflection.conclusion}</p>
                </div>
                
                ${activity.skills && activity.skills.length > 0 ? `
                    <div class="reflection-section">
                        <h3>🏷️ Tags de compétences</h3>
                        <div class="modal-skills">
                            ${activity.skills.map(skill => 
                                `<span class="modal-skill-tag">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <div class="modal-footer">
                <div class="modal-proof">
                    <strong>Preuve :</strong>
                    ${activity.proof.file ? 
                        `<a href="assets/documents/preuves/${activity.proof.file}" target="_blank">
                            📎 ${activity.proof.description}
                        </a>` : 
                        `<span>${activity.proof.description}</span>`
                    }
                </div>
                <button onclick="closeReflectionModal()" style="
                    padding: 0.5rem 1.5rem;
                    background: var(--accent);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                ">Fermer</button>
            </div>
        </div>
    `;
    
    // Ouvrir le modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Empêcher le scroll du body
}

// 4. Fonction pour fermer le modal
function closeReflectionModal() {
    const modal = document.getElementById('reflection-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Rétablir le scroll
    }
}

// 5. Fermer avec ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeReflectionModal();
    }
});

// ========================================
// 6. STATISTIQUES
// ========================================
function updateStatistics(stats) {
    updateStatCard('stat-hours', stats.currentTotalHours, 60);
    updateStatCard('stat-themes', stats.themesCount, 6);
    updateStatCard('stat-activities', stats.activitiesCount, 6);
    updateStatCard('stat-completion', Math.round(stats.completionPercentage) + '%');
    
    const progressBar = document.getElementById('main-progress-bar');
    if (progressBar) {
        progressBar.style.width = stats.completionPercentage + '%';
        progressBar.textContent = Math.round(stats.completionPercentage) + '%';
        progressBar.setAttribute('aria-valuenow', stats.completionPercentage);
    }
}

function updateStatCard(id, value, target = null) {
    const element = document.getElementById(id);
    if (!element) return;
    
    let html = `<div class="stat-value">${value}</div>`;
    if (target) {
        html += `<div class="stat-target">/ ${target}</div>`;
        
        element.classList.remove('complete', 'warning', 'danger');
        if (value >= target) {
            element.classList.add('complete');
        } else if (value >= target * 0.6) {
            element.classList.add('warning');
        } else {
            element.classList.add('danger');
        }
    }
    
    element.innerHTML = html;
}

// ========================================
// 7. VALIDATION
// ========================================
function updateValidation(validation) {
    const container = document.getElementById('validation-status');
    if (!container) return;
    
    const items = [
        { label: 'Heures totales', status: validation.hoursCheck },
        { label: 'Nombre de thèmes', status: validation.themesCheck },
        { label: 'Nombre d\'activités', status: validation.activitiesCheck }
    ];
    
    container.innerHTML = `
        <h3>📋 État de validation</h3>
        <div class="validation-list">
            ${items.map(item => `
                <div class="validation-item">
                    <span>${item.status.startsWith('✅') ? '✅' : '❌'}</span>
                    <span>${item.label}: ${item.status.replace(/[✅❌] /, '')}</span>
                </div>
            `).join('')}
        </div>
        
        <h4>Répartition par thème</h4>
        <div class="theme-distribution">
            ${Object.entries(validation.themeDistribution).map(([theme, hours]) => `
                <div class="theme-item">
                    <span class="theme-name">${theme}</span>
                    <div class="theme-bar-container">
                        <div class="theme-bar" style="width: ${(hours/10)*100}%"></div>
                    </div>
                    <span class="theme-hours">${hours}/10h</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ========================================
// 8. SUGGESTIONS
// ========================================
function displaySuggestions(suggestions) {
    const container = document.getElementById('suggestions');
    if (!container) return;
    
    container.innerHTML = `
        <h3>💡 Suggestions pour compléter</h3>
        
        <div class="suggestion-section">
            <h4>Thèmes manquants</h4>
            <div class="missing-themes">
                ${suggestions.missingThemes.map(theme => 
                    `<span class="theme-badge">${theme}</span>`
                ).join('')}
            </div>
        </div>
        
        <div class="suggestion-section">
            <h4>Activités recommandées</h4>
            <ul class="recommended-activities">
                ${suggestions.recommendedActivities.map(activity => 
                    `<li>${activity}</li>`
                ).join('')}
            </ul>
        </div>
    `;
}

// ========================================
// 9. INTERFACE UTILISATEUR
// ========================================
function initializeUI() {
    createFilters();
    createSearch();
    createSorting();
}

function createFilters() {
    const container = document.getElementById('filters-container');
    if (!container) return;
    
    const themes = [...new Set(ActivitiesConfig.currentData.activities.map(a => a.theme))];
    
    container.innerHTML = `
        <div class="filters">
            <select id="filter-theme" onchange="filterActivities()">
                <option value="all">Tous les thèmes</option>
                ${themes.map(theme => `<option value="${theme}">${theme}</option>`).join('')}
            </select>
            
            <select id="filter-status" onchange="filterActivities()">
                <option value="all">Tous les statuts</option>
                <option value="completed">✅ Validés</option>
                <option value="pending">🔵 En cours</option>
                <option value="draft">🟡 Brouillons</option>
            </select>
            
            <button onclick="resetFilters()" class="btn-secondary">Réinitialiser</button>
        </div>
    `;
}

function createSearch() {
    const container = document.getElementById('search-container');
    if (!container) return;
    
    container.innerHTML = `
        <input 
            type="search" 
            id="search-input" 
            placeholder="Rechercher une activité..."
            onkeyup="searchActivities(this.value)"
            class="search-input"
        >
    `;
}

function createSorting() {
    const container = document.getElementById('sort-container');
    if (!container) return;
    
    container.innerHTML = `
        <select id="sort-select" onchange="sortActivities(this.value)">
            <option value="date-desc">Plus récent</option>
            <option value="date-asc">Plus ancien</option>
            <option value="hours-desc">Plus d'heures</option>
            <option value="hours-asc">Moins d'heures</option>
            <option value="theme">Par thème</option>
        </select>
    `;
}

// ========================================
// 10. FONCTIONS UTILITAIRES
// ========================================
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}


function filterActivities() {
    const theme = document.getElementById('filter-theme').value;
    const status = document.getElementById('filter-status').value;
    
    let filtered = [...ActivitiesConfig.currentData.activities];
    
    if (theme !== 'all') {
        filtered = filtered.filter(a => a.theme === theme);
    }
    
    if (status !== 'all') {
        filtered = filtered.filter(a => a.status === status);
    }
    
    displayActivities(filtered);
}

function searchActivities(query) {
    const search = query.toLowerCase();
    const filtered = ActivitiesConfig.currentData.activities.filter(a =>
        a.title.toLowerCase().includes(search) ||
        a.description.toLowerCase().includes(search) ||
        a.theme.toLowerCase().includes(search)
    );
    
    displayActivities(filtered);
}

function sortActivities(sortBy) {
    let sorted = [...ActivitiesConfig.currentData.activities];
    
    switch(sortBy) {
        case 'date-asc':
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'hours-asc':
            sorted.sort((a, b) => a.hours - b.hours);
            break;
        case 'hours-desc':
            sorted.sort((a, b) => b.hours - a.hours);
            break;
        case 'theme':
            sorted.sort((a, b) => a.theme.localeCompare(b.theme));
            break;
    }
    
    displayActivities(sorted);
}

function resetFilters() {
    document.getElementById('filter-theme').value = 'all';
    document.getElementById('filter-status').value = 'all';
    document.getElementById('search-input').value = '';
    displayActivities(ActivitiesConfig.currentData.activities);
}

function addActivityEventListeners() {
    document.querySelectorAll('.activity-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 8px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showError(message) {
    const container = document.getElementById('activities-list') || 
                     document.querySelector('.activities-grid');
    
    if (container) {
        container.innerHTML = `
            <div class="error-message">
                <p>❌ ${message}</p>
                <button onclick="location.reload()">Réessayer</button>
            </div>
        `;
    }
}

// ========================================
// 11. PUBLIC API
// ========================================
window.ActivitiesManager = {
    loadData: loadActivitiesData,
    refresh: checkForUpdates,
    getData: () => ActivitiesConfig.currentData,
    toggleReflection: toggleReflection
};

// ========================================
// 12. FONCTIONS GLOBALES (pour onclick)
// ========================================
window.openReflectionModal = openReflectionModal;
window.closeReflectionModal = closeReflectionModal;
window.filterActivities = filterActivities;
window.searchActivities = searchActivities;
window.sortActivities = sortActivities;
window.resetFilters = resetFilters;