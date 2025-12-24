document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const scriptURL = 'https://script.google.com/macros/s/AKfycbx_o9it8P7O2vLSGmXPm2_Tq3sAmDMZhqNADe53dgwZCLxlllEero3_xmTuNyxV2_8W/exec'; // <--- Paste your App Script URL here

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const checkedGrades = document.querySelectorAll('input[name="grade_levels[]"]:checked');
        if (checkedGrades.length === 0) {
            alert('Please select at least one Grade Level.');
            return;
        }

        const submitBtn = document.querySelector('.btn-submit-modern');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = "Processing...";
        submitBtn.disabled = true;

        const formData = new FormData(registrationForm);

        fetch(scriptURL, { 
            method: 'POST', 
            body: formData 
        })
        .then(response => {
            alert('Registration Successful! Check your email for confirmation.');
            registrationForm.reset();
            updateLabel();
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Submission failed. Please try again.');
        })
        .finally(() => {
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        });
    });
});

function toggleDropdown() {
  const checkboxes = document.getElementById("checkboxes");
  checkboxes.style.display = checkboxes.style.display === "block" ? "none" : "block";
}

function toggleSelectAll(source) {
  const checkboxes = document.querySelectorAll('.grade-chk');
  checkboxes.forEach(chk => chk.checked = source.checked);
  updateLabel();
}

function updateLabel() {
  const checkboxes = document.querySelectorAll('.grade-chk');
  const checked = Array.from(checkboxes).filter(chk => chk.checked);
  const label = document.getElementById("select-label");
  const selectAll = document.getElementById("selectAll");

  if (checked.length === 0) {
    label.innerText = "Select Grade Levels";
    selectAll.checked = false;
  } else if (checked.length === checkboxes.length) {
    label.innerText = "All Selected";
    selectAll.checked = true;
  } else {
    label.innerText = checked.length + " Levels Selected";
    selectAll.checked = false;
  }
}

window.onclick = function(event) {
  if (!event.target.closest('.custom-multiselect')) {
    document.getElementById("checkboxes").style.display = "none";
  }
}
