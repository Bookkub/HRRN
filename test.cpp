// C++ program for Highest Response Ratio Next (HRRN) Scheduling
#include <bits/stdc++.h>
using namespace std;
// Defining process details
struct process {
	char name;
	int at, bt, ct, wt, tt, rt;
	int completed;
} p[10];

int n;
int x = 1;
// Sorting Processes by Arrival Time
void sortByArrival()
{
	struct process temp;
	int i, j;

	// Selection Sort applied
	for (i = 0; i < n - 1; i++) {
		for (j = i + 1; j < n; j++) {

			// Check for lesser arrival time
			if (p[i].at > p[j].at) {

				// Swap earlier process to front
				temp = p[i];
				p[i] = p[j];
				p[j] = temp;
			}
		}
	}
}

int main()
{
	int i, j, t, sum_bt = 0, count = 0, quan=3, nub=0;
	char c;
	float avgwt = 0, avgtt = 0;
	n = 5;

	// predefined arrival times
	int arriv[] = { 0, 2, 4, 6, 8 };

	// predefined burst times
	int burst[] = { 3, 6, 4, 5, 2 };

	// Initializing the structure variables
	for (i = 0, c = 'A'; i < n; i++, c++) {
		p[i].name = c;
		p[i].at = arriv[i];
		p[i].bt = burst[i];
        p[i].rt = burst[i];

		// Variable for Completion status
		// Pending = 0
		// Completed = 1
		p[i].completed = 0;

		// Variable for sum of all Burst Times
		sum_bt += p[i].bt;
	}

	// Sorting the structure by arrival times
	sortByArrival();
	cout << "Name " << " Arrival Time " << " Burst Time " << " Waiting Time "
	<< " TurnAround Time " ;
	for (t = p[0].at; t < sum_bt;) {

		// Set lower limit to response ratio
		float hrr = -9999;

		// Response Ratio Variable
		float temp;

		// Variable to store next process selected
		int loc;
		nub = 0;
    	x = 1;
		for (i = 0; i < n; i++) {
          
			// Checking if process has arrived and is Incomplete
			if (p[i].at <= t && p[i].completed != 1) {

				// Calculating Response Ratio
				temp = (p[i].bt + (t - p[i].at)) / p[i].bt;

				// Checking for Highest Response Ratio
				if (hrr < temp) {

					// Storing Response Ratio
					hrr = temp;

					// Storing Location
					loc = i;
				}
			}
		}
        while(x)
        {   
            p[loc].rt--;
            p[loc].bt--;
            nub++;
            if(nub == quan || p[loc].rt == 0)
            {
                x = 0;
            }
        }
		// Updating time value
		t +=  nub;
//		cout << "   "<< nub;

		// Calculation of waiting time
		// p[loc].wt = t - p[loc].at - p[loc].bt;
        p[loc].wt = t - p[loc].at - nub;
		// Calculation of Turn Around Time
		p[loc].tt = t - p[loc].at;

		// Sum Turn Around Time for average
		avgtt += p[loc].tt;


		// Updating Completion Status
		if(p[loc].rt <= 0)
		{
			p[loc].completed = 1;
		}
		

		// Sum Waiting Time for average
		avgwt += p[loc].wt;
		cout<< "\n" << p[loc].name <<"\t    " << p[loc].at;
		cout << "\t     " << p[loc].bt + quan << " --> " << p[loc].bt <<"\t     "<< p[loc].wt;
		cout <<"\t\t    "<< p[loc].tt;
	}
	cout << "\nAverage waiting time: " << avgwt / n << endl;
	cout <<"Average Turn Around time: "<< avgtt / n;
}
//This code is contributed by shivi_Aggarwal
