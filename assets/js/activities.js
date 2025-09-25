/* ========================================
   ACTIVITIES.JS - Gestion des activités
   Portfolio TI EPHEC - Mohamed El Mazani
   ======================================== */

// ========================================
// 1. ACTIVITIES DATA STRUCTURE
// ========================================
const ActivitiesManager = {
    activities: [],
    themes: [
        'Développement',
        'Réseaux',
        'Sécurité',
        'Électronique/IoT',
        'Soft Skills',
        'Langues',
        'Communication',
        'Droit IT'
    ],
    activityTypes: [
        { type: 'Hackathon', maxCount: 3, maxHours: 10 },
        { type: 'Formation en ligne', maxCount: 2, maxHours: 10 },
        { type: 'Formation présentiel', maxCount: 3, maxHours: 10 },
        { type: 'Conférence', maxCount: 1, maxHours: 10 },
        { type: 'Visite entreprise', maxCount: 1, maxHours: 10 },
        { type: 'Salon IT', maxCount: 1, maxHours: 10 },
        { type: 'Job Day', maxCount: 1, maxHours: 10 },
        { type: 'Autre', maxCount: null, maxHours: 10 }
    ],
    filters: {
        theme: 'all',
        status: 'all',
        search: ''
    },
    stats: {
        totalHours: 0,
        totalActivities: 0,
        totalThemes: 0,
        completionRate: 0
    },
    editMode: false,
    currentEditId: null
};

// ========================================
// 2. INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('activities-container') || 
        document.querySelector('.portfolio-activities')) {
        initActivities();
    }
});

function initActivities() {
    console.log('📚 Activities manager initialized');
    
    // Load activities from localStorage or use default
    loadActivities();
    
    // Initialize UI components
    initFilters();
    initSearch();
    initSorting();
    
    // Render activities
    renderActivities();
    updateStats();
    
    // Check for admin mode
    checkAdminMode();
}

// ========================================
// 3. DATA MANAGEMENT
// ========================================
function loadActivities() {
    const stored = localStorage.getItem('portfolio_activities');
    
    if (stored) {
        try {
            ActivitiesManager.activities = JSON.parse(stored);
        } catch (e) {
            console.error('Error loading activities:', e);
            loadDefaultActivities();
        }
    } else {
        loadDefaultActivities();
    }
}

function loadDefaultActivities() {
    // Default activities based on what you've done
    ActivitiesManager.activities = [
        {
            id: generateId(),
            theme: 'Sécurité',
            title: 'Hackathon Cybersecurity Challenge',
            type: 'Hackathon',
            hours: 10,
            date: '2024-03-15',
            status: 'completed',
            proof: 'Certificat de participation',
            description: 'Participation au hackathon de cybersécurité organisé par l\'EPHEC.',
            reflection: `
                <h4>Contexte</h4>
                <p>J'ai participé au Cybersecurity Challenge organisé par l'EPHEC en mars 2024. Cet événement de 10 heures m'a permis de mettre en pratique mes connaissances en sécurité informatique.</p>
                
                <h4>Déroulement</h4>
                <p>Durant ce hackathon, j'ai travaillé sur plusieurs défis de sécurité incluant de la cryptographie, de l'analyse de vulnerabilités web et du reverse engineering. Notre équipe a réussi à résoudre 8 challenges sur 12.</p>
                
                <h4>Lien avec mon projet professionnel</h4>
                <p>Cette expérience s'aligne parfaitement avec mon intérêt pour l'infrastructure IT sécurisée. Les compétences en sécurité sont essentielles pour mon futur rôle en administration système.</p>
                
                <h4>Compétences développées</h4>
                <p>J'ai renforcé mes compétences en analyse de logs, utilisation d'outils comme Wireshark et Burp Suite, et développé ma capacité à travailler sous pression en équipe.</p>
            `,
            skills: ['Cybersécurité', 'Analyse de vulnérabilités', 'Travail d\'équipe', 'Gestion du stress']
        },
        {
            id: generateId(),
            theme: 'Hardware',
            title: 'Réparation de smartphones',
            type: 'Autre',
            hours: 8,
            date: '2024-02-10',
            status: 'completed',
            proof: 'Photos des réparations + factures clients',
            description: 'Réparation de plusieurs smartphones pour des particuliers.',
            reflection: `
                <h4>Contexte</h4>
                <p>J'ai effectué la réparation de 5 smartphones différents pour des particuliers, incluant des remplacements d'écran, de batterie et de ports de charge.</p>
                
                <h4>Déroulement</h4>
                <p>Chaque réparation a nécessité un diagnostic précis, la commande des pièces appropriées et l'utilisation d'outils spécialisés. J'ai documenté chaque intervention pour assurer un suivi qualité.</p>
                
                <h4>Lien avec mon projet professionnel</h4>
                <p>Cette activité renforce ma passion pour le hardware et ma capacité à diagnostiquer et résoudre des problèmes techniques concrets, compétences essentielles pour un technicien IT.</p>
                
                <h4>Compétences développées</h4>
                <p>Précision manuelle, diagnostic hardware, relation client, gestion des stocks de pièces détachées.</p>
            `,
            skills: ['Hardware', 'Diagnostic', 'Relation client', 'Précision technique']
        },
        {
            id: generateId(),
            theme: 'Hardware',
            title: 'Montage PC Gaming',
            type: 'Autre',
            hours: 5,
            date: '2024-01-20',
            status: 'completed',
            proof: 'Photos du montage + benchmark results',
            description: 'Assemblage complet d\'un PC gaming haute performance pour un client.',
            reflection: `
                <h4>Contexte</h4>
                <p>J'ai réalisé l'assemblage complet d'un PC gaming sur mesure pour un client, incluant la sélection des composants selon son budget et ses besoins.</p>
                
                <h4>Déroulement</h4>
                <p>Le projet a inclus : sélection des composants (RTX 4070, Ryzen 7), assemblage, cable management, installation Windows et drivers, overclocking et tests de performance.</p>
                
                <h4>Lien avec mon projet professionnel</h4>
                <p>Cette expérience concrète en assemblage et optimisation hardware est directement applicable à mon futur métier en support IT.</p>
                
                <h4>Compétences développées</h4>
                <p>Assemblage PC, optimisation des performances, installation système, conseil client.</p>
            `,
            skills: ['Assemblage PC', 'Optimisation', 'Windows', 'Conseil technique']
        },
        {
            id: generateId(),
            theme: 'Électronique/IoT',
            title: 'Laboratoire électronique - Soudure et prototypage',
            type: 'Autre',
            hours: 2,
            date: '2024-04-05',
            status: 'completed',
            proof: 'Photos des circuits réalisés',
            description: 'Travaux pratiques de soudure et création de circuits dans le labo électronique.',
            reflection: `
                <h4>Contexte</h4>
                <p>J'ai participé à une session de laboratoire électronique où j'ai pratiqué la soudure de composants et le prototypage de circuits.</p>
                
                <h4>Déroulement</h4>
                <p>Durant ces 2 heures, j'ai soudé des composants sur PCB, créé des connexions propres et testé les circuits avec un multimètre.</p>
                
                <h4>Lien avec mon projet professionnel</h4>
                <p>Ces compétences en électronique complètent ma formation IT et me permettent de mieux comprendre le hardware au niveau le plus fondamental.</p>
                
                <h4>Compétences développées</h4>
                <p>Soudure de précision, lecture de schémas, utilisation d'instruments de mesure, patience et minutie.</p>
            `,
            skills: ['Soudure', 'Électronique', 'Prototypage', 'Tests circuits']
        }
    ];
    
    saveActivities();
}

function saveActivities() {
    localStorage.setItem('portfolio_activities', JSON.stringify(ActivitiesManager.activities));
}

function generateId() {
    return 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// ========================================
// 4. ADMIN MODE
// ========================================
function checkAdminMode() {
    // Check if admin mode is active (set by main.js)
    const isAdmin = localStorage.getItem('portfolio_admin_mode') === 'true';
    if (isAdmin) {
        enableAdminFeatures();
    }
}

function enableAdminFeatures() {
    console.log('👨‍💼 Admin features enabled');
    
    // Add admin toolbar
    const toolbar = createAdminToolbar();
    document.body.appendChild(toolbar);
    
    // Make activities editable
    makeActivitiesEditable();
    
    // Add import/export buttons
    addDataManagementButtons();
}

function createAdminToolbar() {
    const toolbar = document.createElement('div');
    toolbar.id = 'admin-toolbar';
    toolbar.className = 'admin-toolbar';
    toolbar.innerHTML = `
        <div class="admin-toolbar-inner">
            <h3>🔧 Mode Administration</h3>
            <div class="admin-actions">
                <button onclick="ActivitiesManager.showAddActivityModal()" class="btn-admin">
                    ➕ Ajouter une activité
                </button>
                <button onclick="ActivitiesManager.exportData()" class="btn-admin">
                    📤 Exporter
                </button>
                <button onclick="ActivitiesManager.importData()" class="btn-admin">
                    📥 Importer
                </button>
                <button onclick="ActivitiesManager.validateHours()" class="btn-admin">
                    ✅ Valider 60h
                </button>
                <button onclick="ActivitiesManager.toggleEditMode()" class="btn-admin btn-edit">
                    ✏️ Mode édition
                </button>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .admin-toolbar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, var(--accent) 0%, var(--secondary) 100%);
            color: white;
            padding: 15px;
            box-shadow: 0 -4px 12px rgba(0,0,0,0.2);
            z-index: 9998;
            transform: translateY(100%);
            animation: slideUp 0.3s forwards;
        }
        
        @keyframes slideUp {
            to { transform: translateY(0); }
        }
        
        .admin-toolbar-inner {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }
        
        .admin-actions {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .btn-admin {
            background: rgba(255,255,255,0.2);
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
            padding: 8px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 14px;
        }
        
        .btn-admin:hover {
            background: rgba(255,255,255,0.3);
            transform: translateY(-2px);
        }
        
        .btn-edit.active {
            background: var(--warning);
            color: var(--dark);
        }
        
        .editable-activity {
            position: relative;
        }
        
        .edit-overlay {
            position: absolute;
            top: 10px;
            right: 10px;
            display: flex;
            gap: 5px;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .editable-activity:hover .edit-overlay {
            opacity: 1;
        }
        
        .edit-btn, .delete-btn {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s;
        }
        
        .edit-btn {
            background: var(--primary);
            color: var(--accent);
        }
        
        .delete-btn {
            background: var(--danger);
            color: white;
        }
        
        .edit-btn:hover, .delete-btn:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);
    
    return toolbar;
}

function makeActivitiesEditable() {
    // Add edit buttons to each activity card
    setTimeout(() => {
        const activityCards = document.querySelectorAll('.activity-card');
        activityCards.forEach(card => {
            if (!card.querySelector('.edit-overlay')) {
                const activityId = card.dataset.activityId;
                const overlay = document.createElement('div');
                overlay.className = 'edit-overlay';
                overlay.innerHTML = `
                    <button class="edit-btn" onclick="ActivitiesManager.editActivity('${activityId}')" title="Modifier">✏️</button>
                    <button class="delete-btn" onclick="ActivitiesManager.deleteActivity('${activityId}')" title="Supprimer">🗑️</button>
                `;
                card.classList.add('editable-activity');
                card.appendChild(overlay);
            }
        });
    }, 500);
}

// ========================================
// 5. CRUD OPERATIONS
// ========================================
ActivitiesManager.showAddActivityModal = function() {
    const modal = createActivityModal();
    document.body.appendChild(modal);
};

ActivitiesManager.editActivity = function(activityId) {
    const activity = this.activities.find(a => a.id === activityId);
    if (activity) {
        const modal = createActivityModal(activity);
        document.body.appendChild(modal);
    }
};

ActivitiesManager.deleteActivity = function(activityId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
        this.activities = this.activities.filter(a => a.id !== activityId);
        saveActivities();
        renderActivities();
        updateStats();
        showNotification('Activité supprimée', 'success');
    }
};

ActivitiesManager.toggleEditMode = function() {
    this.editMode = !this.editMode;
    const btn = document.querySelector('.btn-edit');
    if (btn) {
        btn.classList.toggle('active');
    }
    document.body.classList.toggle('edit-mode');
};

function createActivityModal(activity = null) {
    const isEdit = activity !== null;
    const modal = document.createElement('div');
    modal.className = 'activity-modal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${isEdit ? 'Modifier' : 'Ajouter'} une activité</h2>
                <button class="modal-close" onclick="this.closest('.activity-modal').remove()">×</button>
            </div>
            <form id="activity-form" class="modal-body">
                <div class="form-group">
                    <label for="activity-theme">Thème *</label>
                    <select id="activity-theme" required>
                        <option value="">Sélectionner un thème</option>
                        ${ActivitiesManager.themes.map(theme => 
                            `<option value="${theme}" ${activity?.theme === theme ? 'selected' : ''}>${theme}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="activity-title">Titre de l'activité *</label>
                    <input type="text" id="activity-title" value="${activity?.title || ''}" required>
                </div>
                
                <div class="form-group">
                    <label for="activity-type">Type d'activité *</label>
                    <select id="activity-type" required>
                        <option value="">Sélectionner un type</option>
                        ${ActivitiesManager.activityTypes.map(type => 
                            `<option value="${type.type}" ${activity?.type === type.type ? 'selected' : ''}>${type.type}</option>`
                        ).join('')}
                    </select>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="activity-hours">Heures valorisées *</label>
                        <input type="number" id="activity-hours" min="1" max="10" value="${activity?.hours || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="activity-date">Date *</label>
                        <input type="date" id="activity-date" value="${activity?.date || ''}" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="activity-status">Statut *</label>
                    <select id="activity-status" required>
                        <option value="draft" ${activity?.status === 'draft' ? 'selected' : ''}>🟡 Brouillon</option>
                        <option value="pending" ${activity?.status === 'pending' ? 'selected' : ''}>🔵 En cours</option>
                        <option value="completed" ${activity?.status === 'completed' ? 'selected' : ''}>🟢 Validé</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="activity-proof">Type de preuve *</label>
                    <input type="text" id="activity-proof" value="${activity?.proof || ''}" placeholder="Ex: Certificat, capture écran..." required>
                </div>
                
                <div class="form-group">
                    <label for="activity-description">Description courte</label>
                    <textarea id="activity-description" rows="3">${activity?.description || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="activity-reflection">Analyse réflexive (HTML supporté)</label>
                    <textarea id="activity-reflection" rows="10" placeholder="Structurez avec: Contexte, Déroulement, Lien projet pro, Compétences...">${activity?.reflection || ''}</textarea>
                </div>
                
                <div class="form-group">
                    <label for="activity-skills">Compétences développées (séparées par des virgules)</label>
                    <input type="text" id="activity-skills" value="${activity?.skills?.join(', ') || ''}" placeholder="Ex: Python, Docker, Travail d'équipe...">
                </div>
                
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" onclick="this.closest('.activity-modal').remove()">Annuler</button>
                    <button type="submit" class="btn btn-primary">${isEdit ? 'Modifier' : 'Ajouter'}</button>
                </div>
            </form>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .activity-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: var(--border-radius-lg);
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: var(--shadow-xl);
            animation: slideUp 0.3s;
        }
        
        .modal-header {
            padding: 20px;
            border-bottom: 1px solid var(--light);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-close {
            width: 30px;
            height: 30px;
            border: none;
            background: transparent;
            font-size: 24px;
            cursor: pointer;
            color: var(--gray);
        }
        
        .modal-body {
            padding: 20px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: 500;
            color: var(--dark);
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid var(--gray-light);
            border-radius: var(--border-radius);
            font-size: 14px;
        }
        
        .form-group textarea {
            resize: vertical;
        }
        
        .modal-footer {
            padding: 20px;
            border-top: 1px solid var(--light);
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }
    `;
    
    if (!document.getElementById('modal-styles')) {
        style.id = 'modal-styles';
        document.head.appendChild(style);
    }
    
    // Handle form submission
    setTimeout(() => {
        const form = document.getElementById('activity-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const activityData = {
                id: activity?.id || generateId(),
                theme: document.getElementById('activity-theme').value,
                title: document.getElementById('activity-title').value,
                type: document.getElementById('activity-type').value,
                hours: parseInt(document.getElementById('activity-hours').value),
                date: document.getElementById('activity-date').value,
                status: document.getElementById('activity-status').value,
                proof: document.getElementById('activity-proof').value,
                description: document.getElementById('activity-description').value,
                reflection: document.getElementById('activity-reflection').value,
                skills: document.getElementById('activity-skills').value
                    .split(',')
                    .map(s => s.trim())
                    .filter(s => s)
            };
            
            if (isEdit) {
                const index = ActivitiesManager.activities.findIndex(a => a.id === activity.id);
                ActivitiesManager.activities[index] = activityData;
            } else {
                ActivitiesManager.activities.push(activityData);
            }
            
            saveActivities();
            renderActivities();
            updateStats();
            modal.remove();
            showNotification(isEdit ? 'Activité modifiée' : 'Activité ajoutée', 'success');
        });
    }, 100);
    
    return modal;
}

// ========================================
// 6. DATA IMPORT/EXPORT
// ========================================
ActivitiesManager.exportData = function() {
    const dataStr = JSON.stringify(this.activities, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio_activities_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Données exportées', 'success');
};

ActivitiesManager.importData = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (Array.isArray(imported)) {
                    this.activities = imported;
                    saveActivities();
                    renderActivities();
                    updateStats();
                    showNotification('Données importées avec succès', 'success');
                } else {
                    throw new Error('Format invalide');
                }
            } catch (error) {
                showNotification('Erreur lors de l\'import: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
};

ActivitiesManager.validateHours = function() {
    const stats = calculateStats();
    const messages = [];
    
    if (stats.totalHours < 60) {
        messages.push(`⚠️ Il manque ${60 - stats.totalHours} heures`);
    } else if (stats.totalHours > 60) {
        messages.push(`⚠️ ${stats.totalHours - 60} heures en trop`);
    } else {
        messages.push('✅ 60 heures pile !');
    }
    
    if (stats.uniqueThemes.length < 6) {
        messages.push(`⚠️ Il manque ${6 - stats.uniqueThemes.length} thème(s)`);
    } else {
        messages.push('✅ 6 thèmes ou plus');
    }
    
    if (this.activities.length < 6) {
        messages.push(`⚠️ Il manque ${6 - this.activities.length} activité(s)`);
    } else {
        messages.push('✅ 6 activités ou plus');
    }
    
    // Check theme limits
    stats.themeHours.forEach((hours, theme) => {
        if (hours > 10) {
            messages.push(`⚠️ ${theme}: ${hours}h (max 10h)`);
        }
    });
    
    alert('Validation du portfolio:\n\n' + messages.join('\n'));
};

// ========================================
// 7. RENDERING
// ========================================
function renderActivities() {
    const container = document.getElementById('activities-list') || 
                     document.querySelector('.activities-grid');
    
    if (!container) return;
    
    const filtered = filterActivities();
    
    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="no-activities">
                <p>Aucune activité trouvée</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filtered.map(activity => `
        <div class="activity-card" data-activity-id="${activity.id}">
            <div class="activity-header">
                <span class="activity-badge activity-badge-${activity.status}">
                    ${getStatusIcon(activity.status)} ${getStatusText(activity.status)}
                </span>
                <span class="activity-hours">${activity.hours}h</span>
            </div>
            <h3 class="activity-title">${activity.title}</h3>
            <div class="activity-meta">
                <span class="activity-theme">🏷️ ${activity.theme}</span>
                <span class="activity-type">📋 ${activity.type}</span>
                <span class="activity-date">📅 ${formatDate(activity.date)}</span>
            </div>
            <p class="activity-description">${activity.description || 'Pas de description'}</p>
            <div class="activity-proof">
                <strong>Preuve:</strong> ${activity.proof}
            </div>
            ${activity.skills && activity.skills.length > 0 ? `
                <div class="activity-skills">
                    ${activity.skills.map(skill => 
                        `<span class="skill-tag">${skill}</span>`
                    ).join('')}
                </div>
            ` : ''}
            <button class="btn-expand" onclick="toggleActivityDetails('${activity.id}')">
                Voir l'analyse réflexive ▼
            </button>
            <div class="activity-details" id="details-${activity.id}" style="display: none;">
                <div class="activity-reflection">
                    ${activity.reflection || '<p>Analyse réflexive à rédiger...</p>'}
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-add edit overlays if in admin mode
    if (localStorage.getItem('portfolio_admin_mode') === 'true') {
        makeActivitiesEditable();
    }
}

function filterActivities() {
    let filtered = [...ActivitiesManager.activities];
    
    // Filter by theme
    if (ActivitiesManager.filters.theme !== 'all') {
        filtered = filtered.filter(a => a.theme === ActivitiesManager.filters.theme);
    }
    
    // Filter by status
    if (ActivitiesManager.filters.status !== 'all') {
        filtered = filtered.filter(a => a.status === ActivitiesManager.filters.status);
    }
    
    // Filter by search
    if (ActivitiesManager.filters.search) {
        const search = ActivitiesManager.filters.search.toLowerCase();
        filtered = filtered.filter(a => 
            a.title.toLowerCase().includes(search) ||
            a.description?.toLowerCase().includes(search) ||
            a.theme.toLowerCase().includes(search) ||
            a.skills?.some(s => s.toLowerCase().includes(search))
        );
    }
    
    return filtered;
}

function toggleActivityDetails(activityId) {
    const details = document.getElementById(`details-${activityId}`);
    const button = event.target;
    
    if (details.style.display === 'none') {
        details.style.display = 'block';
        details.classList.add('animate-slide-down');
        button.innerHTML = 'Masquer l\'analyse réflexive ▲';
    } else {
        details.style.display = 'none';
        button.innerHTML = 'Voir l\'analyse réflexive ▼';
    }
}

// ========================================
// 8. FILTERS & SEARCH
// ========================================
function initFilters() {
    const filterContainer = document.querySelector('.activities-filters');
    if (!filterContainer) return;
    
    filterContainer.innerHTML = `
        <div class="filter-group">
            <label>Thème:</label>
            <select id="filter-theme" onchange="ActivitiesManager.filterByTheme(this.value)">
                <option value="all">Tous les thèmes</option>
                ${ActivitiesManager.themes.map(theme => 
                    `<option value="${theme}">${theme}</option>`
                ).join('')}
            </select>
        </div>
        
        <div class="filter-group">
            <label>Statut:</label>
            <select id="filter-status" onchange="ActivitiesManager.filterByStatus(this.value)">
                <option value="all">Tous les statuts</option>
                <option value="completed">🟢 Validé</option>
                <option value="pending">🔵 En cours</option>
                <option value="draft">🟡 Brouillon</option>
            </select>
        </div>
        
        <div class="filter-group">
            <button onclick="ActivitiesManager.resetFilters()" class="btn btn-secondary">
                Réinitialiser
            </button>
        </div>
    `;
}

function initSearch() {
    const searchInput = document.getElementById('activities-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce((e) => {
        ActivitiesManager.filters.search = e.target.value;
        renderActivities();
    }, 300));
}

function initSorting() {
    const sortSelect = document.getElementById('activities-sort');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', (e) => {
        sortActivities(e.target.value);
    });
}

ActivitiesManager.filterByTheme = function(theme) {
    this.filters.theme = theme;
    renderActivities();
};

ActivitiesManager.filterByStatus = function(status) {
    this.filters.status = status;
    renderActivities();
};

ActivitiesManager.resetFilters = function() {
    this.filters = {
        theme: 'all',
        status: 'all',
        search: ''
    };
    document.getElementById('filter-theme').value = 'all';
    document.getElementById('filter-status').value = 'all';
    document.getElementById('activities-search').value = '';
    renderActivities();
};

function sortActivities(sortBy) {
    switch(sortBy) {
        case 'date-desc':
            ActivitiesManager.activities.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'date-asc':
            ActivitiesManager.activities.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'hours-desc':
            ActivitiesManager.activities.sort((a, b) => b.hours - a.hours);
            break;
        case 'hours-asc':
            ActivitiesManager.activities.sort((a, b) => a.hours - b.hours);
            break;
        case 'theme':
            ActivitiesManager.activities.sort((a, b) => a.theme.localeCompare(b.theme));
            break;
        case 'title':
            ActivitiesManager.activities.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }
    renderActivities();
}

// ========================================
// 9. STATISTICS
// ========================================
function updateStats() {
    const stats = calculateStats();
    
    // Update stat cards
    updateStatCard('stat-hours', stats.totalHours, 60);
    updateStatCard('stat-activities', stats.totalActivities, 6);
    updateStatCard('stat-themes', stats.uniqueThemes.length, 6);
    updateStatCard('stat-completion', stats.completionRate, 100, '%');
    
    // Update progress bars
    updateProgressBars(stats);
    
    // Update theme distribution
    updateThemeDistribution(stats);
}

function calculateStats() {
    const activities = ActivitiesManager.activities;
    const totalHours = activities.reduce((sum, a) => sum + a.hours, 0);
    const uniqueThemes = [...new Set(activities.map(a => a.theme))];
    
    const themeHours = new Map();
    activities.forEach(a => {
        themeHours.set(a.theme, (themeHours.get(a.theme) || 0) + a.hours);
    });
    
    const completionRate = Math.min(100, Math.round((totalHours / 60) * 100));
    
    return {
        totalHours,
        totalActivities: activities.length,
        uniqueThemes,
        themeHours,
        completionRate
    };
}

function updateStatCard(elementId, value, target, suffix = '') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const valueElement = element.querySelector('.stat-value');
    const progressElement = element.querySelector('.stat-progress');
    
    if (valueElement) {
        valueElement.textContent = value + suffix;
    }
    
    if (progressElement) {
        const percentage = Math.min(100, (value / target) * 100);
        progressElement.style.width = percentage + '%';
        
        // Change color based on completion
        if (percentage >= 100) {
            progressElement.style.background = 'var(--success)';
        } else if (percentage >= 80) {
            progressElement.style.background = 'var(--warning)';
        }
    }
}

function updateProgressBars(stats) {
    const progressContainer = document.getElementById('progress-overview');
    if (!progressContainer) return;
    
    progressContainer.innerHTML = `
        <div class="progress-item">
            <span class="progress-label">Heures totales</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(100, (stats.totalHours / 60) * 100)}%">
                    ${stats.totalHours}/60h
                </div>
            </div>
        </div>
        
        <div class="progress-item">
            <span class="progress-label">Nombre d'activités</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(100, (stats.totalActivities / 6) * 100)}%">
                    ${stats.totalActivities}/6
                </div>
            </div>
        </div>
        
        <div class="progress-item">
            <span class="progress-label">Thèmes différents</span>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(100, (stats.uniqueThemes.length / 6) * 100)}%">
                    ${stats.uniqueThemes.length}/6
                </div>
            </div>
        </div>
    `;
}

function updateThemeDistribution(stats) {
    const container = document.getElementById('theme-distribution');
    if (!container) return;
    
    const themeArray = Array.from(stats.themeHours.entries());
    themeArray.sort((a, b) => b[1] - a[1]);
    
    container.innerHTML = themeArray.map(([theme, hours]) => {
        const percentage = (hours / 10) * 100;
        const isOver = hours > 10;
        
        return `
            <div class="theme-item ${isOver ? 'theme-over-limit' : ''}">
                <div class="theme-header">
                    <span class="theme-name">${theme}</span>
                    <span class="theme-hours">${hours}/10h</span>
                </div>
                <div class="theme-bar">
                    <div class="theme-progress" style="width: ${Math.min(100, percentage)}%; background: ${isOver ? 'var(--danger)' : 'var(--primary)'}"></div>
                </div>
                ${isOver ? '<span class="theme-warning">⚠️ Limite dépassée</span>' : ''}
            </div>
        `;
    }).join('');
}

// ========================================
// 10. UTILITY FUNCTIONS
// ========================================
function getStatusIcon(status) {
    switch(status) {
        case 'completed': return '🟢';
        case 'pending': return '🔵';
        case 'draft': return '🟡';
        default: return '⚪';
    }
}

function getStatusText(status) {
    switch(status) {
        case 'completed': return 'Validé';
        case 'pending': return 'En cours';
        case 'draft': return 'Brouillon';
        default: return status;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    if (window.portfolioUtils && window.portfolioUtils.showNotification) {
        window.portfolioUtils.showNotification(message, type);
    } else {
        // Fallback notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#5C5C99'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideInRight 0.3s;
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========================================
// 11. EXPORT TO WINDOW
// ========================================
window.ActivitiesManager = ActivitiesManager;
window.toggleActivityDetails = toggleActivityDetails;
window.showActivitiesAdmin = function() {
    enableAdminFeatures();
};