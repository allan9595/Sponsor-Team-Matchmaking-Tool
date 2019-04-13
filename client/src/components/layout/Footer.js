import React from 'react';
import "../layout/footer.css"

export default () => {
  return (
    <div className="customFooter">
    <footer className="bg-dark text-black mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} DevConnector
    </footer>
    </div>
  );
};
